import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const sql = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false,
    }
});

