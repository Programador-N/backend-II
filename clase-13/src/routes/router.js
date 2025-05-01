import { Router } from "express";
import userRouter from "./user.routes.js";
import accountRouter from "./account.routes.js";
import authRouter from "./auth.routes.js";
import cartRouter from "./cart.routes.js";

const router = Router();

router.use("/users", userRouter);
router.use("/account", accountRouter);
router.use("/auth", authRouter);
router.use("/carts", cartRouter);

export default router;