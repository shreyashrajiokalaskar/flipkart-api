class CommonError extends Error {
  isOperational: boolean;
  status: string;
  statusCode: number;

  constructor(error: any) {
    error.message = error?.message ?? 'Error'; 
    super(error.message);
    this.statusCode = error.statusCode ?? 500;
    this.status = this.statusCode.toString().startsWith("4") ? "Fail" : "ERROR";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  sendDevError(error: any, res: any) {
    if (this.isOperational) {
      res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        statusCode: error.statusCode,
      });
    } else {
      res.status(500).json({
        status: "ERROR",
        message: "Something went wrong",
      });
    }
  }

  sendProdError(error: any, res: any) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  }
}
export default CommonError;

export const handleDBCastError = (error: any) => {
  const message = `Invalid ${error.path}: ${error.value}`;
  error.message = message;
  return new CommonError(error);
};

export const handleDuplicateFieldError = (error: any) => {
  const message = `Duplicate Field Value`;
  error.message = message;
  return new CommonError(error);
};
