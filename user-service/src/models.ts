import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./types/index.js";

export type UserDocument = IUser & Document;

const schema:Schema<IUser> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    role: { type: String, default: "user"},
    playlist: [ {
        type: String,
        required: true,
    }, ],
},
{
    timestamps: true,
}
);

export const User = mongoose.model<IUser>("User", schema);
