import authService from "../routes/auth/auth.service";
import { NextFunction, Request, Response } from "express";
import userService from "../routes/user/user.service";
import * as crypto from "crypto";
import bcryptModifiers from "../utils/bcrypt.util";
import fs from "fs";
import { controllerHandler } from "../utils/common-handler";
import csv from "csv-parser";
import { User } from "../entities/user.entity";
import { City } from "../entities/city.entity";
import { connectionManager } from "configs/db-connection.config";
import { IPincode } from "interfaces/common.interface";

const signUp = controllerHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await authService.signUp(req.body);
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

const login = controllerHandler(async (req: any, res: Response) => {
  const user = await authService.login(req.body);
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

const changePassword = controllerHandler(
  async (req: Request, res: Response) => {
    if (!req.body.newPassword)
      res
        .status(400)
        .json({ data: "New password cannot be empty!", status: 400 });

    await authService.changePassword(req.body);
    res
      .status(200)
      .json({ data: "Password updated successfully!", status: 200 });
  }
);

const resetPassword = controllerHandler(
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

const forgotPassword = async (req: Request, res: Response, next: any) => {
  const user = await userService.getUser(req.body.email);
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
    res.status(200).json({ data: `Token sent to ${user?.email}`, status: 200 });
  } catch (error: any) {
    // await user.save();
    res
      .status(500)
      .json({ data: `Token could not be sent to ${user?.email}`, status: 500 });
  }
};

const seedPincodes = async (req: Request, res: Response, next: any) => {
  const filePath = `${process.cwd()}/libs/uploads/pincodes.csv`;
  const batchSize = 5000;
  const pincodes: IPincode[] = [];
  let nonDelivery = 0;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", async (data: any) => {
      if (data.Delivery === "Non Delivery") {
        nonDelivery++;
        return;
      }
      // Validate data
      const pincode = Number(data.Pincode);
      if (isNaN(pincode)) {
        console.error(`Invalid pincode: ${data.Pincode}`);
        return;
      }

      pincodes.push({
        pincode: pincode,
        name: data["Office Name"],
        state: data.StateName,
        district: data.District,
      });

      if (pincodes.length === batchSize) {
        await processBatch([...pincodes]);
        pincodes.length = 0;
      }
    })
    .on("end", async () => {
      try {
        if (pincodes.length > 0) {
          await processBatch([...pincodes]);
        }
        res.send(
          "Data has been successfully inserted into the database." + nonDelivery
        );
      } catch (error: any) {
        res
          .status(500)
          .send(`Error inserting data into the database: ${error.message}`);
      }
    })
    .on("error", (err: any) => {
      res.status(500).send(`Error processing CSV file: ${err.message}`);
    });
};

const processBatch = async (pincodes: IPincode[]) => {
  if (pincodes.length === 0) return;
  const queryRunner = connectionManager.connection?.createQueryRunner();
  await queryRunner?.startTransaction();
  console.log("CREATED QUERY RUNNER");
  try {
    console.log("INSETING USING QUERY RUNNER");
    await queryRunner?.manager.getRepository(City).insert(pincodes);
    await queryRunner?.commitTransaction();
  } catch (error) {
    console.error("Error inserting batch:", pincodes);
    await queryRunner?.rollbackTransaction();
  }
};

const AuthController = {
  signUp,
  login,
  changePassword,
  resetPassword,
  forgotPassword,
  seedPincodes,
};
export default AuthController;
