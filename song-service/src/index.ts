import cors from "cors";
import redis from "redis";
import helmet from "helmet";
import dotenv from "dotenv";
import express from "express";
import songRoutes from "./route.js";

dotenv.config();

const redisHost = process.env.REDIS_HOST;
const website = process.env.FRONTEND_ORIGIN;
const redisPassword = process.env.REDIS_PASSWORD;
const port = process.env.PORT ? parseInt(process.env.PORT) : undefined;
const redisPort = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT): undefined;

if (!port || !redisHost || !redisPassword || !redisPort || !website) {
    throw new Error("Environment variables are not set. Server cannot start.");
}  

export const redisClient = redis.createClient({
    password: redisPassword,
    socket: {
        host: redisHost,
        port: redisPort,
        tls: true
    }
});

redisClient
    .connect()
    .then(() => console.log("Redis Connected Successfully!"))
    .catch(console.error);

const app = express();

app.use(helmet());
app.use(cors({
    origin: website,
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true,
  }));

app.use("/api/v1", songRoutes);

app.listen(port, ()=>{
    console.log(`Server is started at port:${port}`);
});
