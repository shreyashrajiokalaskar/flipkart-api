import { connectionManager } from "configs/db-connection.config";
import { User } from "entities/user.entity";
import { Request, Response } from "express";
import { controllerHandler } from "utils/common-handler";
import { errorResponse } from "utils/error.common";
import { successResponse } from "utils/success.response";
import { UserService } from "./user.service";

export class UserController {
  public static getUserById = controllerHandler(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const user = await UserService.getUserById(id);
      if (!user) {
        return errorResponse(res, 404, "User not found!");
      }
      delete user.password;
      return successResponse(res, 200, "", user, 1);
    }
  );

  public static updateUserById = controllerHandler(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const user = await UserService.getUserById(id);
      if (!user) {
        return errorResponse(res, 404, "User not found!");
      }
      const updatedUser = await connectionManager
        .getRepo(User)
        .update({ id }, req.body);
      if (!updatedUser.affected) {
        return errorResponse(res, 400, "Bad Request!");
      }
      return successResponse(res, 204, "", null, 1);
    }
  );
}
