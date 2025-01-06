import { Response } from "express";

export const successResponse = (
  res: Response,
  success: any,
  result?: any,
  count?: number
) => {
  res.status(success.statusCode || 200).json({
    message: success.message || "Data fetched successfully!",
    result: result || {},
    count,
  });
};
