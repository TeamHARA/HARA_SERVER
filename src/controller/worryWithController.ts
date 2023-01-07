import { category } from '@prisma/client';
import { CreateWithWorryDTO } from '../interfaces/worryWith/CreateWithWorryDTO';
import { NextFunction, Request, Response } from "express";
import { ClientException } from "../common/error/exceptions/customExceptions";
import { success } from "../constants/response";
import statusCode from "../constants/statusCode";
import { worryWithService } from '../service';

const updateFinalOption = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, worryWithId, chosenOptionId } = req.body;
    if (!userId || !worryWithId || !chosenOptionId) {
      throw new ClientException("필요한 값이 없습니다.");
    }
    await worryWithService.chooseFinalOption(userId, worryWithId, chosenOptionId);

    res.status(statusCode.OK).send(success(statusCode.OK, "나의고민 최종결정 성공"));
  } catch (error) {
    next(error);
  }
};

const postWithWorry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createWithWorryDTO: CreateWithWorryDTO  = req.body;
    
    if (!createWithWorryDTO.userId ) {
      throw new ClientException("필요한 값이 없습니다.");
    }
    await worryWithService.createWithWorry(createWithWorryDTO);

    res.status(statusCode.OK).send(success(statusCode.OK, "혼자고민 생성 성공"));
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
    
    
    const result = {
      isAuthor: gotWithWorryDetail.isAuthor,
      isVoted: gotWithWorryDetail.isVoted,
      createdAt: gotWithWorryDetail.createdAt,
      worryTitle: gotWithWorryDetail.title,
      worryContent: gotWithWorryDetail.content,
      category: gotWithWorryDetail.content,
      options: options,
    }

    res.status(statusCode.OK).send(success(statusCode.OK, "함께고민 상세조회 성공", result));
  } catch (error) {
    next(error);
  }

  
}

export default { updateFinalOption,postWithWorry,getWithWorryDetail };