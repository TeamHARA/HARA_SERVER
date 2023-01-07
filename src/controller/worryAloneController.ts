import { CreateAloneWorryDTO } from '../interfaces/worryAlone/CreateAloneWorryDTO';
import { NextFunction, Request, Response } from "express";
import { rm, sc } from "../constants";
import { fail, success } from "../constants/response";
import worryAloneService from '../service/worryAloneService';
import { Result, validationResult } from 'express-validator';
import validation from '../middlwares/validation';


const postAloneWorry = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const createAloneWorryDTO: CreateAloneWorryDTO = req.body;

        const createdAloneWorry = await worryAloneService.createAloneWorry(createAloneWorryDTO);

        if (!createdAloneWorry) {
            return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.CREATE_WORRY_ALONE_ERROR))
        }

        res.status(sc.OK).send(success(sc.OK, rm.CREATE_WORRY_ALONE_SUCCESS));

    } catch (error) {
        next(error);
    }
}

const worryAloneController = {
    postAloneWorry,

}

export default worryAloneController;
