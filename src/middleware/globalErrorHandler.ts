import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = 500;
  let errorMessage = "Internal Server Error";
  let errorDetails = err;

  //PrismaClientValidationError
  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = "Your provided data is incorrent or Missing Field";
  }
  //PrismaClientKnownRequestError
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      statusCode = 400;
      errorMessage = "cannot get data from provided id (API)";
    } else if (err.code === "P2002") {
      statusCode = 400;
      errorMessage = "Dupliate key Error";
    } else if (err.code === "P2003") {
      statusCode = 400;
      errorMessage = "Foreign Key Constraint Failed ";
    }
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    statusCode = 500;
    errorMessage = "Error occured during querry execution";
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = 401;
      errorMessage = "Authentication Failed. Please Check Your Credentials!!";
    } else if (err.errorCode === "P1001") {
      statusCode = 400;
      errorMessage = "Can't Reach Database Server";
    }
  }

  res.status(statusCode);
  res.json({
    message: errorMessage,
    error: errorDetails,
  });
}

export default errorHandler;
