class CommonError extends Error {
  isOperational: boolean;
  status: string;
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith('4') ? 'Fail' : 'ERROR';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  sendDevError(error, res) {
    if (this.isOperational) {
      res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        stack: error.stack,
        error,
      });
    } else {
      res.status(500).json({
        status: 'ERROR',
        message: 'Something went wrong',
      });
    }
  }

  sendProdError(error, res) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  }
}
export default CommonError;

export const handleDBCastError = (error: any) => {
  const message = `Invalid ${error.path}: ${error.value}`;
  return new CommonError(message, 400);
};

export const handleDuplicateFieldError = (error: any) => {
  const message = `Duplicate Field Value`;
  return new CommonError(message, 400);
};
