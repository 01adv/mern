import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewOrderRequestBody } from "../types/types.js";
import { Order } from "../models/order.js";
import { invalidateCache, reduceStock } from "../utils/features.js";
import ErrorHandler from "../utils/utility-class.js";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";

export const newOrder = TryCatch(
  async (req: Request<{}, {}, NewOrderRequestBody>, res, next) => {
    const {
      shippingInfo,
      shippingCharges,
      orderItems,
      user,
      subtotal,
      tax,
      discount,
      total,
    } = req.body;

    if (
      !shippingInfo ||
      !shippingCharges ||
      !orderItems ||
      !user ||
      !subtotal ||
      !tax ||
      !discount ||
      !total
    )
      return next(new ErrorHandler("Please enter all details", 400));

    await Order.create({
      shippingInfo,
      shippingCharges,
      orderItems,
      user,
      subtotal,
      tax,
      discount,
      total,
    });

    await reduceStock(orderItems);

    await invalidateCache({ product: true, order: true, admin: true });

    return res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
    });
  }
);

export const myOrder = TryCatch(async (req, res, next) => {

    //user id li hai user name se
  const { id:user } = req.query;

  const key = `my-orders-${user}`

  let orders = [];

  if (myCache.has(key)) {
    orders = JSON.parse(myCache.get(key) as string);
  } else {
    orders = await Product.find({user});
    myCache.set(key, JSON.stringify(orders));
  }

  return res.status(201).json({
    success: true,
    orders,
  });
});
