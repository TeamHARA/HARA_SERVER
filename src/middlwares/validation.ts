import { NextFunction, Request, Response } from "express";
import { validationResult } from 'express-validator';
import { sc } from "../constants";
import { fail } from "../constants/response";


export default async (req: Request, res: Response, next: NextFunction) => {
   
    const error = validationResult(req);
    
    if (!error.isEmpty()) {
        const errors = error.mapped()
        let notFoundValues = []
        for(const key in errors) {
            notFoundValues.push(errors[key].param);
        }
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, `${notFoundValues.join(', ')} 값이 비었습니다.`));
    }

    next();

}