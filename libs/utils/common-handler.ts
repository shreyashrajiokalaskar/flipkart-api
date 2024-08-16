import { Request, Response, NextFunction } from "express";
import CommonError from "./error.common";

export const controllerHandler = (handler: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (err: any) {
      next(new CommonError(err));
    }
  };
};