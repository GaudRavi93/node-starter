import { NextFunction, Request, Response } from "express";
import { User, UserModel } from "../models/user.model";
import { HttpStatus } from "../utils/httpStatus";

export class UserController extends HttpStatus {

  async signUp(req: Request, res: Response, next: NextFunction) {
    try{
        const user: User = req.body;
        res.status(200).json(user);
    }catch{

    }
  }
}
