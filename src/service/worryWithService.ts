import { CreateWithWorryDTO } from "../interfaces/worryWith/CreateWithWorryDTO";
import { ClientException } from "../common/error/exceptions/customExceptions";
import statusCode from "../constants/statusCode";
import {
  withOptionRepository,
  worryWithRepository,
  categoryRepository,
} from "../repository";
import { WorryWithPreview } from "../interfaces/worryWith/WorryWithPreview";

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

  const chosenOption = await withOptionRepository.findById(optionId);

  if (!chosenOption) {
    throw new ClientException("해당하는 아이디의 옵션이 존재하지 않습니다");
  }

  await worryWithRepository.updateFinalOptionById(worryWithId, optionId);
};

//~ 카테고리 별 목록조회
const isTotal = (categoryId: number): boolean => categoryId === 0;

const findWorryListByCategoryId = async (categoryId: number) => {
  const worryWithList = isTotal(categoryId)
    ? await worryWithRepository.findWorries()
    : await worryWithRepository.findWorryListByCategoryId(categoryId);

  const categoryList = await categoryRepository.getCategoryId();

  if (!categoryList) {
    throw new ClientException("카테고리가 없습니다.");
  }

  if (+categoryId > categoryList.length || +categoryId < 0) {
    throw new ClientException("없는 카테고리입니다");
  }

  return worryWithList;
};

const createWithWorry = async (createWithWorryDTO: CreateWithWorryDTO) => {
  const withWorry = await worryWithRepository.createWithWorry(
    createWithWorryDTO
  );
  if (!withWorry) {
    throw new ClientException();
  }

  return withWorry;
};

const findWithWorry = async (userId: number) => {};

const compareChoiceNotEndedFirst = (
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

const compareChoiceEndedFirst = (a: WorryWithPreview, b: WorryWithPreview) => {
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

const readWithWorry = async (choiceEndedFirst: boolean) => {
  const readWorry = await worryWithRepository.findWithWorries();

  const compare = choiceEndedFirst
    ? compareChoiceEndedFirst
    : compareChoiceNotEndedFirst;
  const sortedWorries = readWorry.sort(compare);
  return sortedWorries;
};

export default {
  findWorryListByCategoryId,
  chooseFinalOption,
  createWithWorry,
  findWithWorry,
  readWithWorry,
};
