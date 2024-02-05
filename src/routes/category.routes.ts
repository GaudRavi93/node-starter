import { Router } from "express";
import { validateToken } from '../middleware/authMiddleware';
import { CategoryController } from './../controllers/category.controller';


export class CategoryRoutes {
    public route: Router = Router();
    private categoryController: CategoryController = new CategoryController();

    constructor(){
        this.route.post("/", validateToken, this.categoryController.createCategory);
        this.route.get("/", validateToken, this.categoryController.getCategories);
        this.route.get("/:id", validateToken, this.categoryController.getCategory);
        this.route.put("/:id", validateToken, this.categoryController.updateCategory);
    }
}