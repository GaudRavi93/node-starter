import { NextFunction, Request, Response } from "express";
import { User, UserModel } from "../models/user.model";
import { HttpStatus } from "../utils/httpStatus";

export class UserController extends HttpStatus {

  async signUp(req: Request, res: Response, next: NextFunction) {
    const httpStatus = new HttpStatus();
    try {
        const user = new UserModel(req.body);
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
}
