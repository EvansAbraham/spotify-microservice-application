import { User } from "./models.js";
import TryCatch from "./TryCatch.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { AuthenticatedRequest } from "./middleware.js";

dotenv.config();

export const registerUser = TryCatch(async(req, res)=>{
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    
    if (user) {
        res.status(400).json({
            message: "User already exist!",
        });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
        name,
        email,
        password: hashedPassword,
    });
    
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY as string, {
        expiresIn: "7d",
    });

    res.status(201).json({
        message: "User Registered Successfully!",
        user,
        token
    })
}); 

export const loginUser = TryCatch(async(req, res)=>{
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(!user) {
        res.status(404).json({
            message: "User does not exist!"
        });
        return;
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch){
        res.status(401).json({
            message: "Invalid credentials"
        })
        return;
    }

    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY as string, {
        expiresIn: "7d",
    });

    res.status(200).json({
        message: "User Logged in Successfully!",
        user,
        token
    })
});

export const myProfile = TryCatch(async(req: AuthenticatedRequest, res)=>{
    const user = req.user;

    res.json(user);
})