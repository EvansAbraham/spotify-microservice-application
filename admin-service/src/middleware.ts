import axios from "axios";
import dotenv from "dotenv";
import multer from "multer";
import { IUser } from "./types/index.js";
import { NextFunction, Request, Response } from "express";

dotenv.config();

interface AuthenticatedRequest extends Request {
    user? : IUser | null;
}

export const isAuth = async(req: AuthenticatedRequest, res: Response, next: NextFunction):
Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

        if (!token) {
            res.status(400).json({
                message: "Invalid Token!"
            });
            return;
        }
        console.log("Token being sent to admin-service:", token);
        const {data} = await axios.get(`${process.env.USER_URL}/api/v1/user/me`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Please Login!"
        });
    }
};

const storage = multer.memoryStorage();

const uploadFile = multer({ storage }).single("file");

export default uploadFile;