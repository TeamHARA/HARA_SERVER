import { prisma, randomAnswer } from "@prisma/client";
import { ClientException } from "../common/error/exceptions/customExceptions";
import statusCode from "../constants/statusCode";
import { randomRepository } from "../repository";
import { randomAnswerDTO } from "../interfaces/random/randomAnswerDTO";

const randomAnswerChoice = async () => {
  const randomList = await randomRepository.findAllRandomAnswer();

  const shuffleAnswer = (arr: randomAnswerDTO[]) => {
    arr.sort(() => Math.random() - 0.5);
  };
  shuffleAnswer(randomList);
  const random = randomList[0];
  return random;
};
export default { randomAnswerChoice };
