import { User } from "./models.js";
import { IUser } from "./types/index.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export interface AuthenticatedRequest extends Request {
  user?: IUser | null;
}

export const isAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    console.log("Token being sent to user-service:", token);

    if (!token) {
      res.status(400).json({
        message: "Please Login the token is not given",
      });

      return;
    }

    const decodedValue = jwt.verify(
      token,
      process.env.JWT_KEY as string
    ) as JwtPayload;

    if (!decodedValue || !decodedValue._id) {
      res.status(401).json({
        message: "Invalid token",
      });
      return;
    }

    const userId = decodedValue._id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      res.status(404).json({
        message: "User Not found",
      });

      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      message: "Authentication Issue",
    });
  }
};