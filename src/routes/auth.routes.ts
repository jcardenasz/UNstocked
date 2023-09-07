import { Router } from 'express';
// import { authRequired } from '../middlewares/validateToken.middlewares'
import asyncError from '../middlewares/asyncError.middleware';
import authController from '../controllers/auth.controller';

const authRouter = Router();
// Return es promesa de objeto, y debe ser void
authRouter.post('/register', asyncError(authController.register));
authRouter.post('/login', asyncError(authController.login));
authRouter.post('/logout', authController.logout);
authRouter.get('/profile', authController.profile);

export default authRouter;
