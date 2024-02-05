import 'dotenv/config';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request } from 'express';
import { User } from '../models/user.model';

interface tokenData {
    id: string,
    phone: string;
    email: string;
    lastName: string;
    firstName: string;
};

export async function hashPassword(password: string){
    return await bcrypt.hash(password, 10);
};

export async function comparePassword(password: string, hashPassword: string){
    return await bcrypt.compare(password, hashPassword);
};

export function generateToken(data: User){
    const tokenData: tokenData = {
        id: data._id,
        phone: data.phone,
        email: data.email,
        lastName: data.lastName,
        firstName: data.firstName
    };
    
    return jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: '180d',
    });
}

export function decodeToken(req: Request){
    const token: string = req.header('Authorization');
    return jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
};