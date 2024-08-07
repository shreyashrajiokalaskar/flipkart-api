import authService from "../routes/auth/auth.service";
import { Request, Response } from "express";
import userService from "../routes/user/user.service";
import * as crypto from "crypto";
import bcryptModifiers from "../utils/bcrypt.util";
import { UserModel } from "../routes/user/user.model";
import fs from "fs";
import { Model } from "sequelize";
const csv = require("csv-parser");
const { v4: uuidv4 } = require("uuid");
const db = require("../../models");

const signUp = async (req: Request, res: Response) => {
  try {
    const user = await authService.signUp(req.body);
    const { token } = user;
    const cookieOptions = {
      expires: new Date(
        Date.now() + (process.env.COOKIE_EXPIRY as any) * 24 * 60 * 60 * 1000
      ),
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    };
    res.cookie("token", token, cookieOptions);
    res.status(201).json({ data: user, status: 201 });
  } catch (error: any) {
    res.status(400).json({ data: error.message, status: 400 });
  }
};

const login = async (req: any, res: Response) => {
  try {
    const user = await authService.login(req.body);
    const { token } = user;
    const cookieOptions = {
      expires: new Date(
        Date.now() + (process.env.COOKIE_EXPIRY as any) * 24 * 60 * 60 * 1000
      ),
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    };
    res.cookie("token", token, cookieOptions);
    res.status(200).json({ data: user, status: 200 });
    // res.status(200).render('index', {
    //   title: 'Hello',
    //   message: 'Welcome!!!',
    // });
  } catch (error: any) {
    res.status(401).json({ error: error.message, status: 401 });
  }
};

const changePassword = async (req: Request, res: Response) => {
  try {
    if (!req.body.newPassword)
      res
        .status(400)
        .json({ data: "New password cannot be empty!", status: 400 });
    console.log("TRYING HERE");

    await authService.changePassword(req.body);
    res
      .status(200)
      .json({ data: "Password updated successfully!", status: 200 });
  } catch (error: any) {
    res.status(400).json({ data: error.message, status: 400 });
  }
};

const resetPassword = async (req: Request, res: Response, next: any) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = (await UserModel.findOne({
      where: {
        resetToken: hashedToken,
        resetTokenExpires: { $gt: Date.now() },
      },
    })) as any;

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
  } catch (error: any) {
    res.status(400).json({ data: error.message, status: 400 });
  }
};

const forgotPassword = async (req: Request, res: Response, next: any) => {
  const user = await userService.getUser(req.body.email);
  try {
    if (!user) {
      res.status(404).json({ data: "User not found!", status: 404 });
    }
    const resetToken = user.resetPasswordToken();
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/auth/reset-password/${resetToken}`;

    const message = `Forgot your password? Reset password at ${resetURL}`;

    await user.save();
    // await sendEmail({
    //   email: user.email,
    //   message,
    //   subject: "Reset Password Token (Valid for 10 min)",
    // });
    res.status(200).json({ data: `Token sent to ${user.email}`, status: 200 });
  } catch (error: any) {
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();
    res
      .status(500)
      .json({ data: `Token could not be sent to ${user.email}`, status: 500 });
  }
};

const seedPincodes = async (req: Request, res: Response, next: any) => {
  const { limit, pageNo } = req.body;
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const filePath = `/home/tech/Documents/personal/flipkart-api/${req.file.path}`;
  const results: {
    id: string;
    pincode: number;
    name: string;
    district: string;
    state: string;
    createdAt: Date;
    updatedAt: Date;
  }[] = [];
  const startIndex = (pageNo - 1) * limit;
  const endIndex = pageNo * limit;
  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", async (data: any) => {
      if (data.Delivery === "Non Delivery") {
        return;
      }
      // Validate data
      const pincode = Number(data.Pincode);
      if (isNaN(pincode)) {
        console.error(`Invalid pincode: ${data.Pincode}`);
        return;
      }

      results.push({
        id: uuidv4(),
        pincode: pincode,
        name: data["Office Name"],
        state: data.StateName,
        district: data.District,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    })
    .on("end", async () => {
      try {
        const paginatedResults = results.slice(startIndex, endIndex);
        paginatedResults.forEach(async (city) => {
          try {
            const {
              id,
              pincode,
              name,
              state,
              district,
              createdAt,
              updatedAt,
            } = city;
            await db.city.create({
              id,
              pincode,
              name,
              state,
              district,
              createdAt,
              updatedAt,
            })
          } catch (error) {
            console.log("ERROR", error, city)
          }
        });
        fs.unlinkSync(filePath); // Delete the uploaded CSV file after processing
        res.send("Data has been successfully inserted into the database.");
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

const AuthController = {
  signUp,
  login,
  changePassword,
  resetPassword,
  forgotPassword,
  seedPincodes,
};
export default AuthController;
