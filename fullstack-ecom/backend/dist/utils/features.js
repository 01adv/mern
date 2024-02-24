import mongoose from "mongoose";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";
let isConnected = false; // track the connection
export const connectDB = async () => {
    mongoose.set("strictQuery", true);
    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }
    try {
        const mongodbUri = "mongodb+srv://07advaita:bqcde2w6Cg9UY7H8@cluster0.1hxm7sv.mongodb.net/?retryWrites=true&w=majority";
        if (!mongodbUri) {
            throw new Error("MONGODB_URI is not defined");
        }
        await mongoose.connect(mongodbUri, {
            dbName: "ecom-6pack",
        });
        isConnected = true;
        console.log("MongoDB connected");
    }
    catch (error) {
        console.log(error);
    }
};
export const invalidateCache = async ({ product, order, admin, }) => {
    if (product) {
        const productKeys = [
            "latest-product",
            "categories",
            "all-products",
        ];
        // product-${id}
        const products = await Product.find({}).select("_id");
        products.forEach((i) => {
            productKeys.push(`product-${i._id}`);
        });
        myCache.del(productKeys);
    }
    if (order) {
    }
    if (admin) {
    }
};
