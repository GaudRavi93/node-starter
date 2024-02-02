import { Router } from "express";
import { UserRoutes } from "./user.route";

export class Routes {
    public router = Router();
    private userRoutes: UserRoutes = new UserRoutes();
    
    constructor() {
        this.router.use("/user", this.userRoutes.route);
    }
}
