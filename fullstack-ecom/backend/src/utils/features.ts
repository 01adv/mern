import mongoose from "mongoose";
import { invalidateCacheProps } from "../types/types.js";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";

let isConnected = false; // track the connection

export const connectDB = async (uri:string) => {
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
}: invalidateCacheProps) => {
  if (product) {
    const productKeys: string[] = [
      "latest-product",
      "categories",
      "all-products",
    ];
    // product-${id}

    const products = await Product.find({}).select("_id")

    products.forEach( (i) => {
      productKeys.push(`product-${i._id}`)
    })

    myCache.del(productKeys);
  }
  if (order) {
  }
  if (admin) {
  }
};
