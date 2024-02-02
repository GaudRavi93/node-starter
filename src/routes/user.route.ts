import { Router } from "express";
import { UserController } from "../controllers/user.controller";

export class UserRoutes {
    public route: Router = Router();
    private userController: UserController = new UserController();

    constructor() {
        this.route.post('/', this.userController.signUp);
    }
}