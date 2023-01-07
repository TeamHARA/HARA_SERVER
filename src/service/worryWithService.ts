import { CreateWithWorryDTO } from '../interfaces/worryWith/CreateWithWorryDTO';
import { ClientException } from "../common/error/exceptions/customExceptions";
import statusCode from "../constants/statusCode";
import { withOptionRepository, worryWithRepository, categoryRepository, voteRepository } from "../repository"

const chooseFinalOption = async (userId: number, worryWithId: number, optionId: number) => {
  const worryWith = await worryWithRepository.findById(worryWithId);

  if (!worryWith) {
    throw new ClientException("해당하는 아이디의 걱정글이 존재하지 않습니다");
  }

  if (worryWith.userId != userId) {
    throw new ClientException("고민글 작성자가 아닙니다.", statusCode.UNAUTHORIZED);
  }

  const chosenOption = await withOptionRepository.findById(optionId);

  if (!chosenOption) {
    throw new ClientException("해당하는 아이디의 옵션이 존재하지 않습니다");
  }

  await worryWithRepository.updateFinalOptionById(worryWithId, optionId);
};

//~ 카테고리 별 목록조회
const isTotal = (categoryId: number): boolean => categoryId === 0;


const findWorryListByCategoryId = async (categoryId: number, userId: number) => {

  const worryWithList = isTotal(categoryId) ? await worryWithRepository.findWorries() : await worryWithRepository.findWorryListByCategoryId(categoryId);

  const worryWithResponse = await Promise.all(
    worryWithList.map(async (worryWith: any) => {

      //! isVoted 로직
      var isVoted: boolean = false;
      //~ 해당 게시글의 선택지 id(optionId)를 가져온다.
      const findWithOptionByWorryWithId = await withOptionRepository.findByWorryWithId(worryWith.id);

      //~ vote한 선택지 id(optionId)를 가져와, 현재 userId가 투표한 리스트가 있는지 반환한다. 
      //!TODO : 유저가 선택지 하나만 투표할 수 있도록
      for (var i = 0; i < findWithOptionByWorryWithId.length; i++) {
        const countVoteListByUserId = await (await voteRepository.findVoteListByOptionId(findWithOptionByWorryWithId[i].id)).filter(v => v.userId == userId).length;
        isVoted = (countVoteListByUserId > 0) ? true : false;
      }

      const data = {
        worryId: worryWith.id,
        title: worryWith.title,
        content: worryWith.content,
        createdAt: worryWith.createdAt,
        category: worryWith.category.name,
        selectedOptionId: worryWith.finalOption,
        isAuthor: (worryWith.userId == userId) ? true : false,
        isVoted: isVoted,
        commentOn: worryWith.commentOn,
        commentCount: worryWith.commentCount,
        option: worryWith.withOption
      };
      return data;
    }),
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
  const withWorry = await worryWithRepository.createWithWorry(createWithWorryDTO);
  if (!withWorry) {
    throw new ClientException();
  }
  return withWorry;
}

const findWithWorry = async (userId: number) => {

}

export default { chooseFinalOption, createWithWorry, findWithWorry, findWorryListByCategoryId };
