import { isCelebrateError } from "celebrate";
import { NextFunction, Request, Response } from "express";
import { errorResponse } from "libs";

export const handleErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handle Celebrate validation errors
  if (isCelebrateError(err)) {
    const validationErrors: Record<string, string> = {};
    err.details.forEach((error, key) => {
      validationErrors[key] = error.message;
    });

    return errorResponse(res, 400, "Validation Failed", validationErrors);
  }

  // Handle Joi validation errors (if used outside Celebrate)
  if (err.isJoi) {
    return errorResponse(
      res,
      400,
      "Validation Failed",
      err.details.map((detail: any) => detail.message)
    );
  }

  // Handle other errors (e.g., server errors)
  const statusCode = err.status || 500;
  return errorResponse(res, statusCode, err.message || "Internal Server Error");
};
