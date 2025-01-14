import { Request, Response, NextFunction } from "express";
import CommonError, { errorResponse } from "./error.common";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

export const controllerHandler = (handler: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (err: any) {
      next(new CommonError(err));
    }
  };
};

export const DtoValidator = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(dtoClass, req.body) as any;
    const errors: ValidationError[] = await validate(dto);

    if (errors.length) {
      const errorMessages = errors.map((error) =>
        Object.values(error.constraints || {}).join(", ")
      );
      return errorResponse(res, 400, "Validation Error", errorMessages);
    }

    req.body = dto;
    next();
  };
};
