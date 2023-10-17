import { Router } from "express";
import { authRequired } from '../middlewares/validateUser.middlewares';
import authController from "../controllers/auth.controller";
import { validateSchema } from "../middlewares/validator.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import asyncError  from "../middlewares/asyncError.middleware";

const authRouter = Router();

authRouter.post("/register", validateSchema(registerSchema),asyncError(authController.register));
authRouter.post("/login",validateSchema(loginSchema),asyncError(authController.login));
authRouter.post("/logout", asyncError(authRequired("refresh")),(authController.logout));
authRouter.get("/profile", asyncError(authRequired("access")), authController.profile);
authRouter.get("/refreshToken", asyncError(authRequired("refresh")),asyncError(authController.refreshToken));

export default authRouter;
