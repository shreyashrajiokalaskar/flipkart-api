import { IUser, ROLES } from "../../interfaces/auth.interface";
import bcryptModifiers from "../../utils/bcrypt.util";
import axios from "axios";
import { UserModel } from "./user.model";
import { DataTypes, UniqueConstraintError, ValidationError } from "sequelize";
import { sequelize } from "../../configs/db-connection.config";
import UserModelFactory from "../../models/user.model";
import RoleModelFactory from "../../models/role.model";
import CommonError from "../../utils/error.common";

const User = UserModelFactory(sequelize, DataTypes);
const Role = RoleModelFactory(sequelize, DataTypes);

const createUser = async (userDto: IUser) => {
  userDto.password = bcryptModifiers.encodePassword(userDto.password);
  try {
    const role = await getIdFromRole(userDto.role ?? ROLES.USER);
    if (userDto.role) {
      delete userDto.role;
    }
    const userData = { ...userDto, roleId: role?.toJSON().id };
    let user = await User.create(userData as any);
    user = user.toJSON();
    delete (user as any).password;
    return user;
  } catch (error: any) {
    if (error instanceof ValidationError) {
      const errorModified = {
        message: error.errors.map((err: any) => err.message).join(', '),
        statusCode: 400
      }
      throw new CommonError(errorModified);
    }
    if (error instanceof UniqueConstraintError) {
      const errorModified = {
        message: 'Duplicate field value',
        statusCode: 409
      }
      throw new CommonError(errorModified);
    }

    // For all other errors
    const errorModified = {
      message: error.message || 'Database Error',
      statusCode: 500
    }
    throw new CommonError(errorModified);

  }
};

const loginUser = async (userDto: Partial<IUser>) => {
  const user = await getUser(userDto.email as string);
  if (user) {
    const isUser = await bcryptModifiers.isValidPassword(
      userDto.password as string,
      user.password
    );
    if (isUser) {
      return user;
    }
    const errorModified = {
      message: "Password Invalid!!!",
      statusCode: 400
    }
    throw new CommonError(errorModified);
  } else {
    const errorModified = {
      message: "USER NOT FOUND",
      statusCode: 404
    }
    throw new CommonError(errorModified);
  }
};

const getUser = async (email: string) => {
  try {
    const user = await UserModel.findOne({ where: { email } });
    return user?.dataValues;
  } catch (error: any) {
    const errorModified = {
      message: error.message,
      statusCode: 404
    }
    throw new CommonError(errorModified);
  }
};

const updateUser = async (userDto: IUser) => {
  try {
    return await UserModel.update(
      {
        password: userDto.password,
        updatedAt: Date.now(),
      },
      {
        where: {
          id: userDto.id,
        },
      }
    );
  } catch (error: any) {
    throw new CommonError(error);
  }
};

const getDummyUsers = async () => {
  try {
    const users = await axios.get("https://dummyjson.com/users?limit=10", {
      headers: { Accept: "application/json", "Accept-Encoding": "identity" },
    });
    users.data.users.forEach(async (user: any) => {
      await setDummyUser(user);
    });
  } catch (error: any) {
    throw new CommonError(error);
  }
};

const setDummyUser = async (user: any) => {
  try {
    const { firstName, lastName, email, image, address } = user;
    const password = bcryptModifiers.encodePassword("password@123");
    address.coordinates = [address.coordinates.lat, address.coordinates.lng];
    await UserModel.create({
      firstName,
      lastName,
      email,
      password,
      image,
      // address,
    });
  } catch (error: any) {
    throw new CommonError(error);
  }
};

const getIdFromRole = async (role: string) => {
  try {
    const filteredRole = await Role.findOne({
      where: {
        role,
      },
    });
    return filteredRole;
  } catch (error: any) {
    throw new CommonError(error);
  }
};

const userService = {
  createUser,
  loginUser,
  getUser,
  updateUser,
  getDummyUsers,
};

export default userService;
