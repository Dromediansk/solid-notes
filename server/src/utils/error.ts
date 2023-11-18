import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

enum ErrorTypes {
  GENERAL_ERROR = "GENERAL_ERROR",
  NOT_FOUND = "NOT_FOUND",
}

export const handleGeneralError: ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    console.error("Something went wrong", err);
    res.status(500).send({ status: 500, message: ErrorTypes.GENERAL_ERROR });
  }
  next();
};

export const handleNotFoundError = (req: Request, res: Response) => {
  res.status(404).send({ status: 404, message: ErrorTypes.NOT_FOUND });
};
