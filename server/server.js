import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js"

dotenv.config();

const app = express()
const _dirname = path.resolve()

const port = process.env.PORT || 5000

app.use(cors({origin: "http://localhost:5173", credentials:true}));

app.use(express.json());
app.use(cookieParser()); // allow us to parse incoming cookies

app.use("/api/auth", authRoutes)

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(_dirname, "/client/dist")));

  app.get("*", (req, res)=> {
    res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"))
  })
}

app.listen(port, () => {
    connectDB();
  console.log(`Example app listening on port ${port}`)
})