import { Router } from "express";
import AuthController from "../../controllers/auth.controller";
import authService from "./auth.service";
import multer from "multer";
const upload = multer({ dest: "libs/uploads/" });
const authRouter = Router();

authRouter.post("/signUp", AuthController.signUp);

authRouter.post("/login", AuthController.login);

authRouter.patch("/reset-password/:token", AuthController.resetPassword);

authRouter.post("/forgot-password", AuthController.forgotPassword);

// authRouter.use(authService.AuthGuard);
authRouter.patch("/change-password", AuthController.changePassword);

authRouter.post(
  "/seed-pincodes",
  upload.single("file"),
  AuthController.seedPincodes
);

export default { authRouter };
