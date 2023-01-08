import { CreateAloneWorryDTO } from "../interfaces/worryAlone/CreateAloneWorryDTO";
import { worryAloneRepository } from "../repository";
import { ClientException } from "../common/error/exceptions/customExceptions";
import statusCode from "../constants/statusCode";
import { WorryAlonePreview } from "../interfaces/worryAlone/WorryAlonePreview";

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

const worryAloneService = {
  createAloneWorry,
  readAloneWorry,
};

export default worryAloneService;
