import express from "express";
import dotenv from "dotenv";
import songRoutes from "./route.js";
import helmet from "helmet";
import cors from "cors";
import redis from "redis";

dotenv.config();

const port = process.env.PORT ? parseInt(process.env.PORT) : undefined;
const redisHost = process.env.REDIS_HOST;
const redisPassword = process.env.REDIS_PASSWORD;
const redisPort = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT): undefined;

if (!port || !redisHost || !redisPassword || !redisPort) {
    throw new Error("Environment variables are not set. Server cannot start.");
}  

export const redisClient = redis.createClient({
    password: redisPassword,
    socket: {
        host: redisHost,
        port: redisPort,
    }
});

redisClient
    .connect()
    .then(() => console.log("Redis Connected Successfully!"))
    .catch(console.error);

const app = express();

app.use("/api/v1", songRoutes);
app.use(helmet());
app.use(cors());

app.listen(port, ()=>{
    console.log(`Server is started at port:${port}`);
});
