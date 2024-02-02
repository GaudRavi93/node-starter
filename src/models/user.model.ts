import mongoose from "mongoose";
import { isEmail } from 'validator';

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
    phone: {
        type: String,
        required: true,
        unique: true,
        validate: (value: string) => {
            if(value.length !== 10){
                throw new Error("Phone number must be 10 digit.")
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [ isEmail, "Please enter valid email." ]
    },
    password: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

export const UserModel = mongoose.model("user", userSchema);