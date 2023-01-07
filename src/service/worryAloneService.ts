import { CreateAloneWorryDTO } from "../interfaces/worryAlone/CreateAloneWorryDTO";
import { worryAloneRepository } from "../repository";
import aloneOptionRepository from '../repository/aloneOptionRepository';
import { ClientException } from "../common/error/exceptions/customExceptions";
import statusCode from "../constants/statusCode";
import { WorryAlonePreview } from "../interfaces/worryAlone/WorryAlonePreview";
import ChooseAloneWorryDTO from '../interfaces/worryAlone/ChooseAloneWorryDTO';

const createAloneWorry = async (createAloneWorryDTO: CreateAloneWorryDTO) => {
  const aloneWorry = await worryAloneRepository.createAloneWorry(
    createAloneWorryDTO
  );
  if (!aloneWorry) {
    throw new ClientException("혼자고민글 생성 실패");
  }
  return aloneWorry;
};

const compareNotFinishedWorryFirst = (
  a: WorryAlonePreview,
  b: WorryAlonePreview
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

const chooseFinalOption = async (chooseAloneWorryDTO: ChooseAloneWorryDTO) => {
  const { aloneWorryId, userId, chosenOptionId } = chooseAloneWorryDTO;
  const aloneWorry = await worryAloneRepository.findById(aloneWorryId);
  if (!aloneWorry) {
    throw new ClientException("해당하는 아이디의 고민글이 존재하지 않습니다");
  }
  if (aloneWorry.userId != userId) {
    throw new ClientException("작성자가 아닙니다", statusCode.FORBIDDEN);
  }
  const chosenOption = await aloneOptionRepository.findById(chosenOptionId);
  if (!chosenOption) {
    throw new ClientException("해당하는 아이디의 선택지가 존재하지 않습니다");
  }
  await worryAloneRepository.updateFinalOption(aloneWorryId, chosenOptionId);
}

const compareFinishedWorryFirst = (
  a: WorryAlonePreview,
  b: WorryAlonePreview
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

const readAloneWorry = async (choiceEndedFirst: boolean) => {
  const readWorry = await worryAloneRepository.findAloneWorries();

  const compare = choiceEndedFirst
    ? compareFinishedWorryFirst
    : compareNotFinishedWorryFirst;
  const sortedWorries = readWorry.sort(compare);
  return sortedWorries;
};

export default {
  createAloneWorry,
  chooseFinalOption,
  readAloneWorry,
};