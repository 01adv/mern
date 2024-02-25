import express from "express";
import { myOrder, newOrder } from "../controllers/order.js";
const app = express.Router();
// route - /api/v1/order/new
app.post("/new", newOrder);
// route - /api/v1/order/my
app.get("/my", myOrder);
// route - /api/v1/order/all
app.get("/all", myOrder);
export default app;
