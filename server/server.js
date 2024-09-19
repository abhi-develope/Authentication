import express from "express";
import { connectDB } from "./db/connectDb.js";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"

dotenv.config();

const app = express()

const port = process.env.PORT || 5000

app.use(express.json());


app.use("/api/auth", authRoutes)

app.listen(port, () => {
    connectDB();
  console.log(`Example app listening on port ${port}`)
})