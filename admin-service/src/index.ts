import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";
import adminRoutes from "./route.js";
import cloudinary from "cloudinary";

dotenv.config();
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();

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
const port = process.env.PORT;

app.use("/api/v1", adminRoutes)

initDb().then(()=>{
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});