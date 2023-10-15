import { Router } from "express";
import { authRequired } from '../middlewares/validateUser.middlewares';
import authController from "../controllers/auth.controller";
import { validateSchema } from "../middlewares/validator.middleware";
// import { errorHandler } from "../middlewares/errorHandler.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import asyncError  from "../middlewares/asyncError.middleware";

const authRouter = Router();

authRouter.post("/register", validateSchema(registerSchema),asyncError(authController.register));
authRouter.post("/login",validateSchema(loginSchema),asyncError(authController.login));
authRouter.post("/logout", authRequired("refresh"), asyncError(authController.logout));
authRouter.get("/profile", authRequired("access"),asyncError(authController.profile));
authRouter.get("/refreshToken", authRequired("refresh"),asyncError(authController.refreshToken));

export default authRouter;
