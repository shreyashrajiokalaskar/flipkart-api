import { Router } from 'express';
import AuthController from '../../controllers/auth.controller';
import authService from './auth.service';

const authRouter = Router();

authRouter.post('/signUp', AuthController.signUp);

authRouter.post('/login', AuthController.login);

authRouter.patch('/reset-password/:token', AuthController.resetPassword);

authRouter.post('/forgot-password', AuthController.forgotPassword);

// authRouter.use(authService.AuthGuard);
authRouter.patch('/change-password', AuthController.changePassword);

export default { authRouter };
