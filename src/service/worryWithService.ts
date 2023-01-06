
import { ClientException } from "../common/error/exceptions/customExceptions";
import statusCode from "../constants/statusCode";
import { withOptionRepository, worryWithRepository, categoryRepository } from "../repository"

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

const findWorryListByCategoryId = async (categoryId: number) => {
  const worryWithList = isTotal(categoryId) ? await worryWithRepository.findWorries() : await worryWithRepository.findWorryListByCategoryId(categoryId);

  const categoryList = await categoryRepository.getCategoryId();

  if (!categoryList) {
    throw new ClientException("카테고리가 없습니다.");
  }

  if (+categoryId > categoryList.length || +categoryId < 0) {
    throw new ClientException("없는 카테고리입니다");
  }

  return worryWithList;
};

export default { chooseFinalOption, findWorryListByCategoryId };