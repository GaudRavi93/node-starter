import { NextFunction, Request, Response } from "express";
import { User, UserModel } from "../models/user.model";
import { HttpStatus } from "../utils/httpStatus";
import { hashPassword } from "../utils/helper";

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
}
