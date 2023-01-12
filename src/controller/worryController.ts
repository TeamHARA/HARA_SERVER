import { NextFunction, Request, Response } from "express";
import { fail, success } from "../constants/response";
import { rm, sc } from "../constants";
import { ClientException } from "../common/error/exceptions/customExceptions";
import statusCode from "../constants/statusCode";
import { voteService, worryWithService } from "../service";
import { CreateVoteDTO } from "../interfaces/vote/worryVoteDTO";

const findWorryListByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryId } = req.params;

        if (!categoryId) {
            throw new ClientException("필요한 Param 값이 없습니다.");
        }

        const worryListData = await worryWithService.findWorryListByCategoryId(+categoryId, +req.body.userId);

        return res.status(sc.OK).send(success(statusCode.OK, rm.READ_WORRYLIST_SUCCESS, worryListData));

    } catch (error) {
        next(error);
    }
};

const createWorryVote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const createVoteDTO: CreateVoteDTO = req.body;

        if (!createVoteDTO || !createVoteDTO.userId || !createVoteDTO.optionId || !createVoteDTO.optionId) {
            throw new ClientException("필요한 값이 없습니다.");
        }

        await voteService.createWorryVote(createVoteDTO);

        const withWorryDetail = await voteService.createWorryVote(createVoteDTO);

        return res.status(sc.OK).send(success(statusCode.OK, rm.CREATE_VOTE_SUCCESS, withWorryDetail));
    } catch (error) {
        next(error);
    }
}

export default { findWorryListByCategory, createWorryVote };