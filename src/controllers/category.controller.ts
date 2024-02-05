import { decodeToken } from "../utils/helper";
import { HttpStatus } from "../utils/httpStatus";
import { NextFunction, Request, Response } from "express";
import { Category, CategoryModel } from "../models/category.model";


export class CategoryController extends HttpStatus {

    async createCategory(req: Request, res: Response, next: NextFunction){
        const httpStatus = new HttpStatus();
        try{
            const requestBody: Category = req.body;
            const user: any = decodeToken(req);

            requestBody.createdBy = user.id;
            const result = await CategoryModel.create(requestBody);

            if(result){
                return httpStatus.successResponse(res, "Category created successfully.", result);
            }else{
                return httpStatus.badRequestResponse(res, "Unable to create category.");
            }
        }catch(error: any){
            return httpStatus.badRequestResponse(res, error.message);
        }
    }

    async getCategories(req: Request, res: Response, next: NextFunction){
        const httpStatus = new HttpStatus();
        try{
            const user: any = decodeToken(req);
            const result = await CategoryModel.find({createdBy: user.id})
                .populate('createdBy', 'phone email firstName lastName')

            if(result.length){
                return httpStatus.successResponse(res, "Categories find successfully.", result);
            }else{
                return httpStatus.badRequestResponse(res, "Unable to find categories.");
            }
        }catch(error: any){
            return httpStatus.badRequestResponse(res, error.message);
        }
    }

    async getCategory(req: Request, res: Response, next: NextFunction){
        const httpStatus = new HttpStatus();
        try{
            const categoryId: string = req.params.id;
            const user: any = decodeToken(req);

            const result = await CategoryModel.findOne({_id: categoryId, createdBy: user.id})
                .populate('createdBy', 'phone email firstName lastName')

            if(result){
                return httpStatus.successResponse(res, "Category find successfully.", result);
            }else{
                return httpStatus.badRequestResponse(res, "Unable to find category.");
            }
        }catch(error: any){
            return httpStatus.badRequestResponse(res, error.message);
        }
    }
}