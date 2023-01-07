import { CreateWithWorryDTO } from "../interfaces/worryWith/CreateWithWorryDTO";
import { NextFunction, Request, Response } from "express";
import { ClientException } from "../common/error/exceptions/customExceptions";
import { success } from "../constants/response";
import statusCode from "../constants/statusCode";
import { worryWithService } from "../service";
import { rm, sc } from "../constants";

const updateFinalOption = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, worryWithId, chosenOptionId } = req.body;
    if (!userId || !worryWithId || !chosenOptionId) {
      throw new ClientException("필요한 값이 없습니다.");
    }
    await worryWithService.chooseFinalOption(
      userId,
      worryWithId,
      chosenOptionId
    );

    res
      .status(statusCode.OK)
      .send(success(statusCode.OK, "나의고민 최종결정 성공"));
  } catch (error) {
    next(error);
  }
};

const createWithWorry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createWithWorryDTO: CreateWithWorryDTO = req.body;
    //console.log(createWithWorryDTO);

    if (!createWithWorryDTO.userId) {
      throw new ClientException("필요한 값이 없습니다.");
    }
    await worryWithService.createWithWorry(createWithWorryDTO);

    res
      .status(statusCode.OK)
      .send(success(statusCode.OK, "혼자고민 생성 성공"));
  } catch (error) {
    next(error);
  }
};

const findWithWorry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      throw new ClientException("필요한 값이 없습니다.");
    }

    await worryWithService.findWithWorry(userId);

    res
      .status(statusCode.OK)
      .send(success(statusCode.OK, "혼자고민 생성 성공"));
  } catch (error) {
    next(error);
  }
};

const getWithWorry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ifsolved } = req.body;
    const withWorries = await worryWithService.readWithWorry(ifsolved);
    res
      .status(statusCode.OK)
      .send(success(statusCode.OK, rm.READ_WITHWORRY_SUCCESS, withWorries));
  } catch (error) {
    next(error);
  }
};

export default {
  updateFinalOption,
  createWithWorry,
  findWithWorry,
  getWithWorry,
};
