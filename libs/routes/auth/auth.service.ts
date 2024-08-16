import { UserModel } from "./../user/user.model";
import { IUser } from "../../interfaces/auth.interface";
import userService from "../user/user.service";
import * as jwt from "jsonwebtoken";
import bcryptModifiers from "../../utils/bcrypt.util";
import CommonError from "../../utils/error.common";
import { Response } from "express";

// Login existing user
const login = async (loginDto: Partial<IUser>) => {
  try {
    let loginDetails = await userService.loginUser(loginDto);
    const loginJSON = JSON.stringify(loginDetails);
    loginDetails = JSON.parse(loginJSON);
    delete loginDetails.password;
    const token = await signToken(loginDetails);
    return { ...loginDetails, token };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Create a new User
const signUp = async (userDto: IUser) => {
  try {
    const user = await userService.createUser(userDto);
    const token = await signToken(user);
    return { ...JSON.parse(JSON.stringify(user)), token };
  } catch (error: any) {
    throw new CommonError(error);
  }
};

// Create access token
const signToken = async (userData: any) => {
  const payload = {
    id: userData.id,
    email: userData.email,
    role: userData.role,
  };
  return jwt.sign(payload, process.env.SECRET_KEY as string, {
    expiresIn: "30m",
  });
};

const changePassword = async (userDto: Partial<IUser>) => {
  try {
    const user = await userService.getUser(userDto.email as string);
    const isPasswordValid = await bcryptModifiers.isValidPassword(
      userDto.password as string,
      user.password
    );
    // if (isPasswordValid) {
    //   const isPasswordSame = await bcryptModifiers.isValidPassword(
    //     userDto.newPassword as string,
    //     user.password
    //   );
    //   if (!isPasswordSame) {
    //     user.password = bcryptModifiers.encodePassword(
    //       userDto.newPassword as string
    //     );
    //     return await userService.updateUser(user);
    //   }
    //   throw new Error('New and old password should not be the same');
    // } else throw new Error('Wrong current password');
  } catch (error: any) {
    throw new CommonError(error);
  }
};

const AuthGuard = async (req: any, res: any, next: any) => {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1];
      const decoded: any = await jwt.verify(
        token,
        process.env.SECRET_KEY as string
      );
      const user = await UserModel.findByPk(decoded.id);
      // if (user?.validatePassword(decoded.iat)) {
      //   throw new Error('User recently changed their password');
      // }
      if (!user) {
        throw new Error("The token does not correspond to a valid user");
      }
      req.user = user;
    }
    if (!token) {
      throw new Error("Unauthorized");
    }
    next();
  } catch (error: any) {
    res
      .status(401)
      .json({ message: error.message || "Unauthorized", status: 401 });
  }
};

const checkRole = (roles: string) => {
  return (req: any, res: Response, next: any) => {
    if (!roles.includes(req?.user?.role)) {
      res.status(403).json({ message: "Permission Denied!", status: 403 });
    }
    next();
  };
};

const setUser = async (req: any, res: any, next: any) => {
  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer")) {
    token = token.split(" ")[1];
    const decoded: any = await jwt.verify(
      token,
      process.env.SECRET_KEY as string
    );
    req.user = decoded;
  }
  next();
};

const authService = {
  login,
  signUp,
  signToken,
  changePassword,
  AuthGuard,
  checkRole,
  setUser,
};

export default authService;
