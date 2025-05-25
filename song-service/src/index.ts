import express from "express";
import dotenv from "dotenv";
import songRoutes from "./route.js";
import helmet from "helmet";
import cors from "cors";

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use("/api/v1", songRoutes);
app.use(helmet());
app.use(cors());

app.listen(port, ()=>{
    console.log(`Server is started at port:${port}`);
});
