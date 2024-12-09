import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import notificationRoutes from "./routes/notifications.js";
import connectMongoDB from "./database/connectMongoDB.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";


const app = express();


app.use(cors({
    origin: process.env.FRONTEND_HOST,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Cookie'],
    credentials: true
}));


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const MAX_PAYLOAD_SIZE = '10mb'; 

app.use(express.json({ limit: MAX_PAYLOAD_SIZE })); 
app.use(express.urlencoded({ limit: MAX_PAYLOAD_SIZE, extended: true }));
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);


app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000");
    connectMongoDB();
});
