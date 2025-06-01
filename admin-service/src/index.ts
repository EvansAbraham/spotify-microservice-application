import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";
import adminRoutes from "./route.js";
import cloudinary from "cloudinary";
import helmet from "helmet";
import cors from "cors";
import redis from "redis";

dotenv.config();

const port = process.env.PORT;
const cloudName = process.env.CLOUD_NAME;
const cloudApiKey = process.env.CLOUD_API_KEY;
const cloudApiSecret = process.env.CLOUD_API_SECRET;
const website = process.env.FRONTEND_ORIGIN;
const redisHost = process.env.REDIS_HOST;
const redisPassword = process.env.REDIS_PASSWORD;
const redisPort = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT): undefined;

if (!port || !cloudName || !cloudApiKey || !cloudApiSecret || !redisHost || !redisPassword || !redisPort || !website) {
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

cloudinary.v2.config({
    cloud_name: cloudName,
    api_key: cloudApiKey,
    api_secret: cloudApiSecret,
});

const app = express();
app.use(helmet());
app.use(cors({
    origin: website,
    credentials: true,
}));

app.use(express.json());

async function initDb() {
    try {
        await sql.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

        await sql.query(`
            CREATE TABLE IF NOT EXISTS albums(
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            thumbnail VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            `);
        
        await sql.query(`
            CREATE TABLE IF NOT EXISTS songs(
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            title VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            thumbnail VARCHAR(255),
            audio VARCHAR(255) NOT NULL,
            album_id UUID REFERENCES albums(id) ON DELETE SET NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            `);
            console.log("Database initialized successfully!");
    } catch (error) {
        console.error("Error database initialization!", error);
    }
}

app.use("/api/v1", adminRoutes)

initDb().then(()=>{
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});