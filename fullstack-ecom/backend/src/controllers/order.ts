import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewOrderRequestBody } from "../types/types.js";
import { Order } from "../models/order.js";

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

    
  }
);
