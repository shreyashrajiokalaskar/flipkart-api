import { ROLES } from "../shared/common.enum";

export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: ROLES;
  id?: string;
}
