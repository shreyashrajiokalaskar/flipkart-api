import { NextFunction, Request, Response } from "express";
import * as crypto from "crypto";
import bcryptModifiers from "../../utils/bcrypt.util";
import { controllerHandler } from "../../utils/common-handler";
import { User } from "../../entities/user.entity";
import { AuthService } from "./auth.service";
import { UserService } from "modules/user/user.service";

export class AuthController {
  public static signUp = controllerHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await AuthService.signUp(req.body);
      const { token } = user;
      // const cookieOptions = {
      //   expires: new Date(
      //     Date.now() + (process.env.COOKIE_EXPIRY as any) * 24 * 60 * 60 * 1000
      //   ),
      //   secure: process.env.NODE_ENV === "production",
      //   httpOnly: true,
      // };
      // res.cookie("token", token, cookieOptions);
      res.status(201).json({ data: user, status: 201 });
    }
  );

  public static login = controllerHandler(async (req: any, res: Response) => {
    console.log("IN CONTROLLER");
    const user = await AuthService.login(req.body);
    // const { token } = user;
    // const cookieOptions = {
    //   expires: new Date(
    //     Date.now() + (process.env.COOKIE_EXPIRY as any) * 24 * 60 * 60 * 1000
    //   ),
    //   secure: process.env.NODE_ENV === "production",
    //   httpOnly: true,
    // };
    // res.cookie("token", token, cookieOptions);
    res.status(200).json({ data: user, status: 200 });
  });

  public static changePassword = controllerHandler(
    async (req: Request, res: Response) => {
      if (!req.body.newPassword)
        res
          .status(400)
          .json({ data: "New password cannot be empty!", status: 400 });

      await AuthService.changePassword(req.body);
      res
        .status(200)
        .json({ data: "Password updated successfully!", status: 200 });
    }
  );

  public static resetPassword = controllerHandler(
    async (req: Request, res: Response, next: any) => {
      const hashedToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

      const user = (await User.findOne({ where: { email: "" } })) as any;

      if (!user) {
        res.status(400).json({ data: `Token is invalid`, status: 400 });
      }
      const password = bcryptModifiers.encodePassword(
        req.body.password as string
      );
      user.password = password;
      user.updatedAt = Date.now();
      user.resetToken = undefined;
      user.resetTokenExpires = undefined;
      await user.save();
      res.status(200).json({
        data: "Password changed successfully! Please login!",
        status: 200,
      });
    }
  );

  public static forgotPassword = async (
    req: Request,
    res: Response,
    next: any
  ) => {
    const user = await UserService.getUser(req.body.email);
    try {
      if (!user) {
        res.status(404).json({ data: "User not found!", status: 404 });
      }
      // const resetToken = user.resetPasswordToken();
      // const resetURL = `${req.protocol}://${req.get(
      //   "host"
      // )}/api/auth/reset-password/${resetToken}`;

      // const message = `Forgot your password? Reset password at ${resetURL}`;

      // await user.save();
      // await sendEmail({
      //   email: user.email,
      //   message,
      //   subject: "Reset Password Token (Valid for 10 min)",
      // });
      res
        .status(200)
        .json({ data: `Token sent to ${user?.email}`, status: 200 });
    } catch (error: any) {
      // await user.save();
      res
        .status(500)
        .json({
          data: `Token could not be sent to ${user?.email}`,
          status: 500,
        });
    }
  };
}
