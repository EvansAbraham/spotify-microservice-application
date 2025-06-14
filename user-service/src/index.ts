import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes.js";
import helmet from 'helmet';
import cors from "cors";

dotenv.config();

const port = process.env.PORT;
const website = process.env.FRONTEND_ORIGIN;
const mongoDbUri = process.env.MONGODB_URI as string;

if (!port || !mongoDbUri || !website) {
    throw new Error("Environment variables are not set. Server cannot start.");
}

const connectDb = async () => {
    try {
        mongoose.connect( mongoDbUri, {
            dbName: "spotifyUser",
        });
        console.log("Database Connected!");
    }
    catch (error) {
        console.error(error);
    }
}

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors({
    origin: website,
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true,
  }));

app.use("/api/v1", userRoutes);

app.get("/", (req, res)=>{
    res.send("Server is working!");
})

app.listen(port, () => {
    console.log(`Application running in port ${port}`);
    connectDb();
})
