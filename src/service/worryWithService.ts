import { withOption } from "@prisma/client";
import { CreateWithWorryDTO } from "../interfaces/worryWith/CreateWithWorryDTO";
import { ClientException } from "../common/error/exceptions/customExceptions";
import statusCode from "../constants/statusCode";
import {
  withOptionRepository,
  worryWithRepository,
  categoryRepository,
  voteRepository,
} from "../repository";
import { getFormattedDate } from "../common/utils/dateFormat";
import { WorryWithPreview } from "../interfaces/worryWith/WorryWithPreview";
import commentRepository from "../repository/commentRepository";
import { Console } from "console";
import userRepository from "../repository/userRepository";
import { rm } from "../constants";

const chooseFinalOption = async (
  userId: number,
  worryWithId: number,
  optionId: number
) => {
  const worryWith = await worryWithRepository.findById(worryWithId);

  if (!worryWith) {
    throw new ClientException("해당하는 아이디의 걱정글이 존재하지 않습니다");
  }

  if (worryWith.userId != userId) {
    throw new ClientException(
      "고민글 작성자가 아닙니다.",
      statusCode.UNAUTHORIZED
    );
  }

  if (worryWith.finalOption) {
    throw new ClientException("이미 최종 결정된 고민글입니다.");
  }

  const chosenOption = await withOptionRepository.findById(optionId);

  if (!chosenOption) {
    throw new ClientException("해당하는 아이디의 옵션이 존재하지 않습니다");
  }

  await worryWithRepository.updateFinalOptionById(worryWithId, optionId);
};

//~ 카테고리 별 목록조회
const isTotal = (categoryId: number): boolean => categoryId === 0;

const findWorryListByCategoryId = async (
  categoryId: number,
  userId: number
) => {
  const worryWithList = isTotal(categoryId)
    ? await worryWithRepository.findWorries()
    : await worryWithRepository.findWorryListByCategoryId(categoryId);

  const worryWithResponse = await Promise.all(
    worryWithList.map(async (worryWith: any) => {
      //! isVoted 로직
      var isVoted: boolean = false;
      var percentage: number = 0;
      var countAllVote: number = 0;
      var loginUserVoteId: number | undefined = 0;

      //~ 해당 게시글의 선택지 id(optionId)를 가져온다.
      const findWithOptionByWorryWithId = await withOptionRepository.findOptionsWithWorryId(worryWith.id);

      //!TODO : 유저가 선택지 하나만 투표할 수 있도록
      for (var i = 0; i < worryWith.withOption.length; i++) {
        const findVoteListByOptionId =
          await voteRepository.findVoteListByOptionId(
            findWithOptionByWorryWithId[i].id
          );
        //! isVoted - 현재 로그인한 유저의 vote 결과를 가져와서 하나 이상이면 true
        isVoted =
          findVoteListByOptionId.filter((v) => v.userId == userId).length > 0
            ? true
            : false;

        //~ 로그인한 유저가 투표했다면 어떤 선택지를 투표했는지 
        if (isVoted) {
          const findVoteByWorryWithId = await voteRepository.findVoteByWorryWithId(
            findWithOptionByWorryWithId[i].id
          );
          if (findVoteByWorryWithId?.userId == userId && findVoteByWorryWithId?.optionId > 0) {
            loginUserVoteId = (findVoteByWorryWithId?.optionId > 0) ? findVoteByWorryWithId?.optionId : 0;
          }
        }
        //! 해당 게시글의 전체 투표 개수
        countAllVote += findVoteListByOptionId.length;
      }

      //! percentage 계산 & option 작업
      const option: Array<object> = [];
      for (var i = 0; i < worryWith.withOption.length; i++) {
        //~ 해당 게시글의 optionId당 vote 결과
        const findVoteListByOptionId =
          await voteRepository.findVoteListByOptionId(
            findWithOptionByWorryWithId[i].id
          );
        percentage = findVoteListByOptionId.length / countAllVote;
        option.push({
          id: worryWith.withOption[i].id,
          worryWithId: worryWith.withOption[i].worryWithId,
          title: worryWith.withOption[i].title,
          image: worryWith.withOption[i].image,
          hasImage: worryWith.withOption[i].hasImage,
          percentage: Math.round(percentage * 100),
        });
      }

      const data = {
        worryId: worryWith.id,
        title: worryWith.title,
        content: worryWith.content,
        createdAt: getFormattedDate(worryWith.createdAt),
        category: worryWith.category.name,
        finalOptionId: worryWith.finalOption,
        isAuthor: worryWith.userId == userId ? true : false,
        isVoted: isVoted,
        loginUserVoteId: loginUserVoteId,
        commentOn: worryWith.commentOn,
        commentCount: worryWith.commentCount,
        option: option,
      };
      return data;
    })
  );

  const categoryList = await categoryRepository.getCategoryId();

  if (!categoryList) {
    throw new ClientException("카테고리가 없습니다.");
  }

  if (+categoryId > categoryList.length || +categoryId < 0) {
    throw new ClientException("없는 카테고리입니다");
  }

  return worryWithResponse;
};

const createWithWorry = async (createWithWorryDTO: CreateWithWorryDTO) => {
  const createWithWorryData = await worryWithRepository.createWithWorry(
    createWithWorryDTO
  );
  if (!createWithWorryData) {
    throw new ClientException("함께고민글 생성 실패");
  }

  return createWithWorryData;
};

const findWithWorryDetail = async (withWorryId: number) => {
  const findWithWorryData = await worryWithRepository.findWithWorryDetail(
    withWorryId
  );
  if (!findWithWorryData) {
    throw new ClientException("해당하는 아이디의 고민글이 존재하지 않습니다.");
  }

  return findWithWorryData;
};

const findOptionsWithWorryId = async (withWorryId: number) => {
  const findWithOptionData = await withOptionRepository.findOptionsWithWorryId(
    withWorryId
  );
  if (!findWithOptionData) {
    throw new ClientException("해당하는 아이디의 선택지가 존재하지 않습니다.");
  }

  return findWithOptionData;
};

const compareNotFinishedWorryFirst = (
  a: WorryWithPreview,
  b: WorryWithPreview
) => {
  const aOption = a.finalOption || 0;
  const bOption = b.finalOption || 0;
  if (aOption > bOption) {
    return 1;
  }
  if (aOption < bOption) {
    return -1;
  }
  if (a.createdAt < b.createdAt) {
    return 1;
  }
  return -1;
};

const compareFinishedWorryFirst = (
  a: WorryWithPreview,
  b: WorryWithPreview
) => {
  const aOption = a.finalOption || 0;
  const bOption = b.finalOption || 0;
  if (aOption < bOption) {
    return 1;
  }
  if (aOption > bOption) {
    return -1;
  }
  if (a.createdAt < b.createdAt) {
    return 1;
  }
  return -1;
};

const readWithWorry = async (choiceEndedFirst: number) => {
  const readWorry = await worryWithRepository.findWithWorries();

  const compare = choiceEndedFirst
    ? compareFinishedWorryFirst
    : compareNotFinishedWorryFirst;
  const sortedWorries = readWorry.sort(compare);
  return sortedWorries;
};

const findCommentByWithWorryId = async (withWorryId: number) => {
  return await commentRepository.findCommentByWithWorryId(withWorryId);
};


const findUserById = async (userId: number) => {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new ClientException(rm.NO_USER);
  }

  return user;
}


const findCategoryNameById = async (categoryId: number) => {
  const category = await categoryRepository.getCategoryById(categoryId);
  if (!category) {
    return rm.READ_CATEGORY_FAIL;
  }
  return category.name;
};





export default {
  findWorryListByCategoryId,
  chooseFinalOption,
  createWithWorry,
  findWithWorryDetail,
  readWithWorry,
  findOptionsWithWorryId,
  findCommentByWithWorryId,
  findUserById,
  findCategoryNameById,

};
