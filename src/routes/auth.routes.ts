import { Router } from "express";
import { authRequired } from '../middlewares/validateUser.middlewares';
import authController from "../controllers/auth.controller";
import { validateSchema } from "../middlewares/validator.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schema";

const authRouter = Router();

authRouter.post("/register", validateSchema(registerSchema),authController.register);
authRouter.post("/login",validateSchema(loginSchema),authController.login);
authRouter.post("/logout", authController.logout);
authRouter.get("/profile", authRequired,authController.profile);
authRouter.post("/refreshToken", authController.refreshToken);

authRouter.post("/forgotPassword", authController.forgotPassword);

export default authRouter;
