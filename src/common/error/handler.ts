import { NextFunction, Request, Response } from "express";
import statusCode from "../../constants/statusCode";
import responseMessage from "../../constants/responseMessage";
import { fail } from "../../constants/response";
const globalExceptionHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err?.statusCode || statusCode.INTERNAL_SERVER_ERROR;
  res
    .status(status)
    .send(fail(status, err?.message || responseMessage.INTERNAL_SERVER_ERROR));
  next(err);
};

export default globalExceptionHandler;
