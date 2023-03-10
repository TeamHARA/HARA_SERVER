import { CreateCommentDTO } from "./../interfaces/worryWith/CreateCommentDTO";
import { calculatePercentage } from "./../common/utils/calculatePercentage";
import { CreateWithWorryDTO } from "../interfaces/worryWith/CreateWithWorryDTO";
import { NextFunction, Request, Response } from "express";
import { ClientException } from "../common/error/exceptions/customExceptions";
import { success } from "../constants/response";
import statusCode from "../constants/statusCode";
import { worryWithService } from "../service";
import { rm, sc } from "../constants";
import { getFormattedDate } from "../common/utils/dateFormat";
import { voteRepository, withOptionRepository } from "../repository";
import commentService from "../service/commentService";
import { nextTick } from "process";
import { error } from "console";

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
    const createWithWorryDTO: CreateWithWorryDTO = req.body;

    await worryWithService.createWithWorry(createWithWorryDTO);

    res
      .status(statusCode.OK)
      .send(success(statusCode.OK, rm.CREATE_WITH_WORRY_SUCCESS));
  } catch (error) {
    next(error);
  }
};

const getWithWorryDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { withWorryId } = req.params;
    const { userId } = req.body;

    if (!withWorryId) {
      throw new ClientException("필요한 파라미터 값이 없습니다.");
    }

    const gotWithWorryDetail = await worryWithService.findWithWorryDetail(
      +withWorryId
    );
    const options = await worryWithService.findOptionsWithWorryId(+withWorryId);
    const comments = await worryWithService.findCommentByWithWorryId(
      +withWorryId
    );

    const percentageArray = await calculatePercentage(options);

    const optionResult: Array<object> = [];
    for (var i = 0; i < options.length; ++i) {
      optionResult.push({
        id: options[i].id,
        worryWithId: options[i].worryWithId,
        title: options[i].title,
        image: options[i].image,
        hasImage: options[i].hasImage,
        percentage: percentageArray[i],
        advantage: options[i].advantage,
        disadvantage: options[i].disadvantage,
      });
    }

    const commentResult: Array<object> = [];
    for (var i = 0; i < comments.length; ++i) {
      const commentedUser = await worryWithService.findUserById(
        comments[i].userId
      );
      commentResult.push({
        userNickName: commentedUser.nickName,
        userImage: commentedUser.profileImage,
        content: comments[i].content,
        createdAt: getFormattedDate(comments[i].createdAt),
      });
    }

    let isVoted: boolean = false;
    let selectedOptionId: number = 0;

    for (var i = 0; i < options.length; ++i) {
      const optionVoted = await voteRepository.findVoteByOptionId(options[i].id, userId);
      if (optionVoted) {
        isVoted = true;
        selectedOptionId = optionVoted.optionId;
        break;
      }
    }

    const worryResult = {
      isAuthor: gotWithWorryDetail.userId == userId ? true : false,
      finalOption: gotWithWorryDetail.finalOption,
      isVoted: isVoted,
      selectedOptionId: selectedOptionId,
      createdAt: getFormattedDate(gotWithWorryDetail.createdAt),
      worryTitle: gotWithWorryDetail.title,
      worryContent: gotWithWorryDetail.content,
      category: await worryWithService.findCategoryNameById(
        gotWithWorryDetail.categoryId
      ),
      options: optionResult,
      commentCount: comments.length,
      comments:
        comments.length == 0 ? null : commentResult,

    };

    res
      .status(statusCode.OK)
      .send(
        success(statusCode.OK, rm.READ_WITHWORRYDETAIL_SUCCESS, worryResult)
      );
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
    const { ifSolved } = req.params;
    const withWorries = await worryWithService.readWithWorry(+ifSolved);
    const withWorriesResult: Array<object> = [];
    for (var i = 0; i < withWorries.length; ++i) {
      {
        withWorriesResult.push({
          id: withWorries[i].id,
          categoryId: withWorries[i].categoryId,
          title: withWorries[i].title,
          createdAt: getFormattedDate(withWorries[i].createdAt),
          finalOption: withWorries[i].finalOption,
        })

      }
    }
    res
      .status(statusCode.OK)
      .send(success(statusCode.OK, rm.READ_WITHWORRY_SUCCESS, withWorriesResult));
  } catch (error) {
    next(error);
  }
};

const postWithWorryComment = async (req: Request, res: Response, next: NextFunction) => {
  const createCommentDTO: CreateCommentDTO = req.body;

  try {
    await commentService.createWithWorryComment(createCommentDTO);

    res
      .status(statusCode.OK)
      .send(success(statusCode.OK, rm.CREATE_WITH_WORRY_COMMENT_SUCCESS));
  } catch (error) {
    next(error);
  }
};

const deleteWithWorry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { deleteIdArray } = req.body;
    const { userId } = req.body;

    if (!deleteIdArray) {
      throw new ClientException("필요한 배열값이 없습니다.");
    }

    if (!Array.isArray(deleteIdArray)) {
      throw new ClientException("요청이 배열값이 아닙니다.");
    }

    if (!userId) {
      throw new ClientException("필요한 유저가 없습니다.");
    }

    await worryWithService.deleteWithWorry(deleteIdArray, userId);

    res
      .status(statusCode.OK)
      .send(success(statusCode.OK, rm.DELETE_WORRY_SUCCESS));
  } catch (error) {
    next(error);
  }
};

export default {
  updateFinalOption,
  postWithWorry,
  getWithWorry,
  getWithWorryDetail,
  postWithWorryComment,
  deleteWithWorry
};
