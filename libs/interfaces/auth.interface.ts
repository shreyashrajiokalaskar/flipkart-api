export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: ROLES;
  id?: string;
}


export enum ROLES {
  USER = "USER",
  ADMIN = "ADMIN"
}