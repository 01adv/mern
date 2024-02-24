import express from "express";
import { deleteProduct, getAdminProducts, getAllCategories, getAllProducts, getLatestProducts, getSingleProduct, newProduct, updateProduct } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();


// create new product - api/v1/product/new
app.post("/new", adminOnly, singleUpload, newProduct)

// to search product with filter - /api/v1/product/all
app.get('/all', getAllProducts)

// get last 5 product - api/v1/product/latest
app.get('/latest', getLatestProducts)

// get all unique categories - api/v1/product/categories
app.get('/categories', getAllCategories)

// to get all products = api/v1/product/admin-products
app.get('/admin-products',adminOnly, getAdminProducts)

// to get delete or update product 
app.route("/:id").get(getSingleProduct).put(adminOnly, singleUpload, updateProduct).delete(adminOnly, deleteProduct)

export default app;


// 3.7.33 time
// 18.13 24 feb