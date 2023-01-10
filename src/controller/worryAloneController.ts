import { CreateAloneWorryDTO } from "../interfaces/worryAlone/CreateAloneWorryDTO";
import { NextFunction, Request, Response } from "express";
import { rm, sc } from "../constants";
import { fail, success } from "../constants/response";
import { validationResult } from "express-validator";
import { ClientException } from "../common/error/exceptions/customExceptions";
import { worryAloneService } from "../service";
import statusCode from "../constants/statusCode";
import { getFormattedDate } from '../common/utils/dateFormat';
import { voteRepository } from "../repository";

const postAloneWorry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createAloneWorryDTO: CreateAloneWorryDTO = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res
        .status(sc.BAD_REQUEST)
        .send(fail(sc.BAD_REQUEST, rm.BAD_REQUEST));
    }


    const createdAloneWorry = await worryAloneService.createAloneWorry(createAloneWorryDTO);

    if (!createdAloneWorry) {
        return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.CREATE_WORRY_ALONE_ERROR))
    }

    res.status(sc.OK).send(success(sc.OK, rm.CREATE_WORRY_ALONE_SUCCESS));

    } catch (error) {
        next(error);
    }
}

const getAloneWorry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ifSolved } = req.body;
    const aloneWorries = await worryAloneService.readAloneWorry(ifSolved);
    res
      .status(sc.OK)
      .send(success(sc.OK, rm.READ_ALONEWORRY_SUCCESS, aloneWorries));
  } catch (error) {
    next(error);
  }
};

const patchAloneWorry = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqValidationResult = validationResult(req);
        if (!reqValidationResult.isEmpty()) {
            return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));
        }

        const { userId, worryAloneId, chosenOptionId } = req.body;

        await worryAloneService.chooseFinalOption({
            userId,
            aloneWorryId: worryAloneId,
            chosenOptionId,
        })

        res.status(sc.OK).send(success(sc.OK, rm.CHOOSE_ALONE_OPTION_SUCCESS));
    } catch (error) {
        next(error);
    }
}

const getAloneWorryDetail =async (req:Request, res: Response, next: NextFunction) => {
  try {
    const { aloneWorryId } = req.params;
    const { userId } = req.body;
    
    if (!aloneWorryId) {
      throw new ClientException("필요한 파라미터 값이 없습니다.");
    }

    const gotWithWorryDetail = await worryAloneService.findAloneWorryDetail(+aloneWorryId,userId);
    const options = await worryAloneService.findOptionsAloneWorryId(+aloneWorryId);
   
    const result = {
      finalOption: gotWithWorryDetail.finalOption,
      createdAt: getFormattedDate(gotWithWorryDetail.createdAt),
      worryTitle: gotWithWorryDetail.title,
      worryContent: gotWithWorryDetail.content,
      category: gotWithWorryDetail.content,
      options: options,
    }

    res.status(statusCode.OK).send(success(statusCode.OK, rm.READ_ALONEWORRYDETAIL_SUCCESS, result));
  } catch (error) {
    next(error);
  }
};



export default {
    postAloneWorry,
    getAloneWorry,
    patchAloneWorry,
    getAloneWorryDetail,
}