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

const postWithWorry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createWithWorryDTO: CreateWithWorryDTO  = req.body;
    
    await worryWithService.createWithWorry(createWithWorryDTO);

    res
      .status(statusCode.OK)
      .send(success(statusCode.OK, "혼자고민 생성 성공"));
  } catch (error) {
    next(error);
  }
};

const getWithWorryDetail =async (req:Request, res: Response, next: NextFunction) => {
  try {
    const { withWorryId } = req.params;
    
    if (!withWorryId) {
      throw new ClientException("필요한 파라미터 값이 없습니다.");
    }

    const gotWithWorryDetail = await worryWithService.findWithWorryDetail(+withWorryId);
    const options = await worryWithService.findOptionsWithWorryId(+withWorryId);
    const comments = await worryWithService.findCommentByWithWorryId(+withWorryId);
    
    const result = {
      isAuthor: gotWithWorryDetail.isAuthor,
      createdAt: gotWithWorryDetail.createdAt,
      worryTitle: gotWithWorryDetail.title,
      worryContent: gotWithWorryDetail.content,
      category: gotWithWorryDetail.content,
      options: options,
      comments: comments.length == 0 ? "댓글이 존재하지 않습니다" : comments,
    }

    res.status(statusCode.OK).send(success(statusCode.OK, "함께고민 상세조회 성공", result));
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
  postWithWorry,
  getWithWorry,
  getWithWorryDetail,
};
