import mongoose from "mongoose";
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
