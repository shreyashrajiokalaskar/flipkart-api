import { IUser } from "../../interfaces/auth.interface";
import bcryptModifiers from "../../utils/bcrypt.util";
import axios from "axios";
import CommonError from "../../utils/error.common";
import { ROLES } from "../../shared/common.enum";
import { User } from "../../entities/user.entity";
import { Role } from "../../entities/role.entity";
import { connectionManager } from "../..";


export class UserService{
  public static createUser = async (userDto: IUser) => {
    userDto.password = bcryptModifiers.encodePassword(userDto.password);
    try {
      const role = await this.getIdFromRole(userDto.role ?? ROLES.BUYER);
      if (userDto.role) {
        delete userDto.role;
      }
      const userData = { ...userDto, roleId: role?.id };
      let user = await User.create(userData as any).save();
      delete (user as any).password;
      return user;
    } catch (error: any) {
  
      // For all other errors
      const errorModified = {
        message: error.message || "Database Error",
        statusCode: 500,
      };
      throw new CommonError(errorModified);
    }
  };
  
  public static loginUser = async (userDto: Partial<IUser>) => {
    const user = await this.getUser(userDto.email as string);
    if (user) {
      const isUser = await bcryptModifiers.isValidPassword(
        userDto.password as string,
        user.password as string
      );
      if (isUser) {
        delete user.roleId;
        return user;
      }
      const errorModified = {
        message: "Password Invalid!!!",
        statusCode: 400,
      };
      throw new CommonError(errorModified);
    } else {
      const errorModified = {
        message: "USER NOT FOUND",
        statusCode: 404,
      };
      throw new CommonError(errorModified);
    }
  };
  
  public static getUser = async (email: string) => {
    try {
      const user = await User.findOne({
        where: { email },
        relations: ["role"]
      });
      return user;
    } catch (error: any) {
      const errorModified = {
        message: error.message,
        statusCode: 404,
      };
      throw new CommonError(errorModified);
    }
  };
  
  public static updateUser = async (userDto: IUser) => {
    try {
      return await User.update(userDto.id as string,
        {
          password: userDto.password,
        }
      );
    } catch (error: any) {
      throw new CommonError(error);
    }
  };
  
  public static getDummyUsers = async () => {
    try {
      const users = await axios.get("https://dummyjson.com/users?limit=10", {
        headers: { Accept: "application/json", "Accept-Encoding": "identity" },
      });
      users.data.users.forEach(async (user: any) => {
        await this.setDummyUser(user);
      });
    } catch (error: any) {
      throw new CommonError(error);
    }
  };
  
  public static setDummyUser = async (user: any) => {
    try {
      const { firstName, lastName, email, image, address } = user;
      const password = bcryptModifiers.encodePassword("password@123");
      address.coordinates = [address.coordinates.lat, address.coordinates.lng];
      await connectionManager.getRepo(User).create({
          firstName,
          lastName,
          email,
          password,
      }).save();
    } catch (error: any) {
      throw new CommonError(error);
    }
  };
  
  public static getIdFromRole = async (role: string) => {
    try {
      const filteredRole = await Role.findOne({
        where: {
          name: role,
        },
      });
      return filteredRole;
    } catch (error: any) {
      throw new CommonError(error);
    }
  };

}
