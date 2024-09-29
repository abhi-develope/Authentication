import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDb.js";
import authRoutes from "./routes/auth.route.js"

dotenv.config();

const app = express()

const port = process.env.PORT || 5000

app.use(cors({origin: "http://localhost:5173", credentials:true}));

app.use(express.json());
app.use(cookieParser()); // allow us to parse incoming cookies

app.use("/api/auth", authRoutes)

app.listen(port, () => {
    connectDB();
  console.log(`Example app listening on port ${port}`)
})