import { TryCatch } from "../middlewares/error.js";
import { Order } from "../models/order.js";
export const newOrder = TryCatch(async (req, res, next) => {
    const { shippingInfo, shippingCharges, orderItems, user, subtotal, tax, discount, total, } = req.body;
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
});
