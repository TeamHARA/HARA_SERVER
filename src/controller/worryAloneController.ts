import { CreateAloneWorryDTO } from '../interfaces/worryAlone/CreateAloneWorryDTO';
import { NextFunction, Request, Response } from "express";
import { rm, sc } from "../constants";
import { fail, success } from "../constants/response";
import worryAloneService from '../service/worryAloneService';
import { Result, validationResult } from 'express-validator';


const createAloneWorry = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            const errors = error.mapped()
            let notFoundValues = []
            for(const key in errors) {
                notFoundValues.push(errors[key].param);
            }
            return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, `${notFoundValues.join(', ')} 값이 비었습니다.`))
        }

        const createAloneWorryDTO: CreateAloneWorryDTO = req.body;

        const data = await worryAloneService.createAloneWorry(createAloneWorryDTO);

        if (!data) {
            return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.CREATE_WORRY_ALONE_ERROR))
        }

        const createdAloneWorry = await worryAloneService.createAloneWorry(createAloneWorryDTO);

        if (!createdAloneWorry) {
            return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.CREATE_WORRY_ALONE_ERROR))
        }

        res.status(sc.OK).send(success(sc.OK, rm.CREATE_WORRY_ALONE_SUCCESS));

    } catch (error) {
        next(error);
    }
}

const worryAloneController = {
    createAloneWorry,

}

export default worryAloneController;
