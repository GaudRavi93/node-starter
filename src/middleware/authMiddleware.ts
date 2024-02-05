import { decodeToken } from "../utils/helper";
import { HttpStatus } from "../utils/httpStatus";
import { UserModel } from "../models/user.model";
import { NextFunction, Request, Response } from "express";

export async function validateToken(req: Request, res: Response, next: NextFunction){
    const httpStatus = new HttpStatus();

    const token = req.header('Authorization');
    if(!token){
        httpStatus.unauthorizedResponse(res, "Access denied. Token not provided.");
    };

    try {
        const decode: any = decodeToken(req);
        const user = await UserModel.findById(decode.id);
        if (!user) {
            return httpStatus.unauthorizedResponse(res, 'Access denied. Invalid user.');
        };

        next();
    } catch (error: any) {
        return httpStatus.unauthorizedResponse(res, 'Access denied. Invalid token.');
    }
};