import { NextFunction, Request, Response } from "express";
import { User, UserModel } from "../models/user.model";
import { HttpStatus } from "../utils/httpStatus";
import { comparePassword, hashPassword } from "../utils/helper";

export class UserController extends HttpStatus {
    
    async signUp(req: Request, res: Response, next: NextFunction) {
        const httpStatus = new HttpStatus();
        try {
            const requestBody: User = req.body;
            requestBody.password = await hashPassword(requestBody.password);
            
            const user = new UserModel(requestBody);
            const result = await user.save();

            if(result){
                return httpStatus.recordCreatedResponse(res, "User created successfully.", user);
            }else{
                return httpStatus.badRequestResponse(res, "Unable to create user.");
            }
        } catch(error: any) { 
            return httpStatus.badRequestResponse(res, error.message);
        }
    }

    async signIn(req: Request, res: Response, next: NextFunction){
        const httpStatus = new HttpStatus();
        try{
            const {email, password} = req.body;

            if(!email || !password){
                return httpStatus.badRequestResponse(res, "Invalid email or password.");
            }

            const user: any = await UserModel.findOne({email});
            if(!user) return httpStatus.badRequestResponse(res, "Invalid email or password.");

            const isValidPassword = await comparePassword(password, user.password);
            if(!isValidPassword) return httpStatus.badRequestResponse(res, "Invalid email or password.");

            httpStatus.successResponse(res, "Login successfully.", user);
        }catch(error: any) {
            return httpStatus.badRequestResponse(res, error.message);
        }
    }
}
