import { Router } from "express";
import { UserRoutes } from "./user.route";
import { CategoryRoutes } from "./category.routes";

export class Routes {
    public router = Router();
    private userRoutes: UserRoutes = new UserRoutes();
    private categoryRoutes: CategoryRoutes = new CategoryRoutes();
    
    constructor() {
        this.router.use("/user", this.userRoutes.route);
        this.router.use("/category", this.categoryRoutes.route);
    }
}
