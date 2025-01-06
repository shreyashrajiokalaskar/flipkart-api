import { Router } from "express";
import { AuthController } from "./auth.controller";
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
authRouter.post("/signUp", AuthController.signUp);

authRouter.post("/login", AuthController.login);

authRouter.patch("/reset-password/:token", AuthController.resetPassword);

authRouter.post("/forgot-password", AuthController.forgotPassword);

// authRouter.use(authService.AuthGuard);
authRouter.patch("/change-password", AuthController.changePassword);

/**
 * @swagger
 * /auth/seed-pincodes:
 *   post:
 *     summary: Seed pincodes from a file
 *     description: Upload a CSV file containing pincodes along with pagination options.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The CSV file containing pincodes.
 *               limit:
 *                 type: integer
 *                 description: Number of records per page.
 *                 example: 10
 *               pageNo:
 *                 type: integer
 *                 description: The page number.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Successfully seeded pincodes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pincodes successfully seeded.
 *                 totalRecords:
 *                   type: integer
 *                   example: 100
 *       400:
 *         description: Bad Request - Missing or invalid parameters.
 *       500:
 *         description: Internal Server Error.
 */

export default { authRouter };
