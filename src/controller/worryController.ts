import { NextFunction, Request, Response } from "express";
import { fail, success } from "../constants/response";
import { rm, sc } from "../constants";
import { ClientException } from "../common/error/exceptions/customExceptions";
import statusCode from "../constants/statusCode";
import { worryService } from "../service";

const findWorryListByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryId } = req.params;

        if (!categoryId) {
            throw new ClientException("필요한 Param 값이 없습니다.");
        }

        const data = await worryService.findWorryListByCategoryId(+categoryId);

        return res.status(sc.OK).send(success(statusCode.OK, rm.READ_WORRYLIST_SUCCESS, data));

    } catch (error) {
        next(error);
    }
};

export default { findWorryListByCategory };