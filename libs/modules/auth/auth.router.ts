import { Router } from "express";
import { AuthController } from "./auth.controller";
import { createUserValidation, loginValidation } from "./auth.validations";
const authRouter = Router();

/**
 * @swagger
 * /api/signUp:
 *   post:
 *     summary: Sign-up a new user
 *     description: Creates a new user if does not exist
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello, Swagger!
 */
authRouter.post("/signUp", createUserValidation, AuthController.signUp);

authRouter.post("/login", loginValidation, AuthController.login);

authRouter.patch("/reset-password/:token", AuthController.resetPassword);

authRouter.post("/forgot-password", AuthController.forgotPassword);

// authRouter.use(authService.AuthGuard);
authRouter.patch("/change-password", AuthController.changePassword);

export default { authRouter };
