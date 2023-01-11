import { CreateAloneWorryDTO } from "../interfaces/worryAlone/CreateAloneWorryDTO";
import { worryAloneRepository } from "../repository";
import aloneOptionRepository from "../repository/aloneOptionRepository";
import { ClientException } from "../common/error/exceptions/customExceptions";
import statusCode from "../constants/statusCode";
import { WorryAlonePreview } from "../interfaces/worryAlone/WorryAlonePreview";
import ChooseAloneWorryDTO from "../interfaces/worryAlone/ChooseAloneWorryDTO";

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

const updateFinalOption = async (
  aloneWorryId: number,
  chosenOptionId: number
) => {
  await worryAloneRepository.updateFinalOption(aloneWorryId, chosenOptionId);
  //await aloneOptionRepository.updateIsSelectedById(chosenOptionId, true);
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
  if (aloneWorry.finalOption) {
    throw new ClientException("이미 최종 결정된 고민글입니다.");
  }
  const chosenOption = await aloneOptionRepository.findByIdAndWorryId(
    chosenOptionId,
    aloneWorryId
  );
  if (!chosenOption) {
    throw new ClientException("해당 고민글의 선택지 아이디가 아닙니다.");
  }
  await updateFinalOption(aloneWorryId, chosenOptionId);
};

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

const readAloneWorry = async (choiceEndedFirst: number) => {
  const readWorry = await worryAloneRepository.findAloneWorries();

  const compare = choiceEndedFirst
    ? compareFinishedWorryFirst
    : compareNotFinishedWorryFirst;
  const sortedWorries = readWorry.sort(compare);
  return sortedWorries;
};

const findAloneWorryDetail = async (aloneWorryId: number, userId: number) => {
  const findAloneWorryData = await worryAloneRepository.findAloneWorryDetail(
    aloneWorryId
  );

  if (!findAloneWorryData) {
    throw new ClientException("해당하는 아이디의 고민글이 존재하지 않습니다.");
  }
  if (userId != findAloneWorryData.userId) {
    throw new ClientException("작성자가 아닙니다", statusCode.FORBIDDEN);
  }

  return findAloneWorryData;
};

const findOptionsAloneWorryId = async (aloneWorryId: number) => {
  const findAloneOptionData =
    await aloneOptionRepository.findOptionsAloneWorryId(aloneWorryId);
  if (!findAloneOptionData) {
    throw new ClientException("해당하는 아이디의 선택지가 존재하지 않습니다.");
  }

  return findAloneOptionData;
};

export default {
  createAloneWorry,
  chooseFinalOption,
  readAloneWorry,
  findAloneWorryDetail,
  findOptionsAloneWorryId,
};
