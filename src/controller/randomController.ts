import { NextFunction, Request, Response } from "express";
import { fail, success } from "../constants/response";
import { rm, sc } from "../constants";
import { ClientException } from "../common/error/exceptions/customExceptions";
import statusCode from "../constants/statusCode";
import { randomService } from "../service";

const getRandomAnswer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await randomService.randomAnswerChoice();
    return res
      .status(sc.OK)
      .send(success(statusCode.OK, rm.READ_RANDOM_SUCCESS, data));
  } catch (error) {
    next(error);
  }
};

const findQuickWorryList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await randomService.findQuickWorryList(req.body.userId);
    return res
      .status(sc.OK)
      .send(success(statusCode.OK, rm.READ_QUICKWORRY_SUCCESS, data));
  } catch (error) {
    next(error);
  }
};

export default { getRandomAnswer, findQuickWorryList };
