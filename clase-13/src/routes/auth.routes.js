import { Router } from "express";
import { loginController, registerController, logoutController, profileController } from "../controllers/account.controllers.js";

const authRouter = Router();

authRouter.post("/login", loginController);
authRouter.post("/register", registerController);
authRouter.get("/logout", logoutController);
authRouter.get("/profile", profileController);

export default authRouter;
