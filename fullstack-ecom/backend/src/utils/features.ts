import mongoose from "mongoose";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";
import { OrderItemType, invalidateCacheProps } from "../types/types.js";

let isConnected = false; // track the connection

export const connectDB = async (uri: string) => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    if (!uri) {
      throw new Error("MONGODB_URI is not defined");
    }

    await mongoose.connect(uri, {
      dbName: "ecom-6pack",
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

export const invalidateCache = async ({
  product,
  order,
  admin,
  userId,
  orderId,
  productId,
}: invalidateCacheProps) => {
  if (product) {
    const productKeys: string[] = [
      "latest-product",
      "categories",
      "all-products",
    ];

    if (typeof productId === "string") productKeys.push(`product-${productId}`);

    if (typeof productId === "object"){
      productId.forEach((i) => productKeys.push(`product-${i}`));
}
    myCache.del(productKeys);
  }
  if (order) {
    const orderKeys: string[] = [
      `all-orders`,
      `my-orders-${userId}`,
      `order-${orderId}`,
    ];

    myCache.del(orderKeys);
  }
  if (admin) {
  }
};

export const reduceStock = async (orderItems: OrderItemType[]) => {
  for (let i = 0; i < orderItems.length; i++) {
    const order = orderItems[i];
    const product = await Product.findById(order.productId);
    if (!product) throw new Error("Product not found");
    product.stock -= order.quantity;
    await product.save();
  }
};
