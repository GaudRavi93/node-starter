import mongoose from "mongoose";

export interface User {
    phone: string;
    email: string;
    password: string;
    lastName: string;
    firstName: string;
    createdAt?: Date;
    updatedAt?: Date;
};

const userSchema = new mongoose.Schema({
    phone: { type: String, require: true },
    email: { type: String, require: true },
    password: {type: String, require: true },
    lastName: { type: String, require: true },
    firstName: { type: String, require: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }
});

export const UserModel = mongoose.model("user", userSchema);