import { Router } from "express";
import { UserController } from "./user.controller";
import {
  getUserByIdValidation,
  updateUserValidation,
} from "./user.validations";

const userRouter = Router();

userRouter.patch("/:id", getUserByIdValidation, updateUserValidation, UserController.updateUserById);

userRouter.get("/:id", getUserByIdValidation, UserController.getUserById);

export default { userRouter };
