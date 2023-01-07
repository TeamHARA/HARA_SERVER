import { CreateAloneWorryDTO } from "../interfaces/worryAlone/CreateAloneWorryDTO";
import { NextFunction, Request, Response } from "express";
import { rm, sc } from "../constants";
import { fail, success } from "../constants/response";
import worryAloneService from "../service/worryAloneService";
import { validationResult } from "express-validator";

const createAloneWorry = async (
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

    const data = await worryAloneService.createAloneWorry(createAloneWorryDTO);

    if (!data) {
      return res
        .status(sc.BAD_REQUEST)
        .send(fail(sc.BAD_REQUEST, rm.CREATE_WORRY_ALONE_ERROR));
    }

    const createdAloneWorry = await worryAloneService.createAloneWorry(
      createAloneWorryDTO
    );

    if (!createdAloneWorry) {
      return res
        .status(sc.BAD_REQUEST)
        .send(fail(sc.BAD_REQUEST, rm.CREATE_WORRY_ALONE_ERROR));
    }
    res.status(sc.OK).send(success(sc.OK, rm.CREATE_WORRY_ALONE_SUCCESS));
  } catch (error) {
    next(error);
  }
};

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

const worryAloneController = {
  createAloneWorry,
  getAloneWorry,
};

export default worryAloneController;
