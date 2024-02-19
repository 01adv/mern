import express from "express";
// importing routes
import userRoutes from "./routes/user.js";
import { connectDB } from "./utils/features.js";
const port = 4000;
connectDB();
const app = express();
app.get('/', (req, res) => {
    res.send("API Working with /api/v1");
});
// using routes
app.use("api/v1/user", userRoutes);
app.listen(port, () => {
    console.log(`Express is working on http://localhost:${port}`);
});
