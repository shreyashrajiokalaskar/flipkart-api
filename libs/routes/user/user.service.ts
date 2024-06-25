import { IUser } from "../../interfaces/auth.interface";
import bcryptModifiers from "../../utils/bcrypt.util";
import axios from "axios";
import { UserModel } from "./user.model";

const createUser = async (userDto: IUser) => {
  userDto.password = bcryptModifiers.encodePassword(userDto.password);
  try {
    return await UserModel.create(userDto as any);
  } catch (error: any) {
    throw new Error(JSON.parse(JSON.stringify(error)).errors[0].message);
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
    throw new Error("Password Invalid!!!");
  } else {
    throw new Error("USER NOT FOUND");
  }
};

const getUser = async (email: string) => {
  try {
    const user = await UserModel.findOne({ where: { email } });
    return user?.dataValues;
  } catch (error: any) {
    throw new Error(error);
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
    throw new Error(error);
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
    throw new Error(error);
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
    throw new Error(error);
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
