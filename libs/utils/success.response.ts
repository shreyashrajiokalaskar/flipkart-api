import { Response } from "express";

export const successResponse = (
  res: Response,
  statusCode?: number,
  message?: string,
  result?: any,
  count?: number
) => {
  res.status(statusCode || 200).json({
    message: message || "Data fetched successfully!",
    result: result || {},
    count,
  });
};
