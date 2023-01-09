import { ClientException } from "../common/error/exceptions/customExceptions";
import { randomRepository } from "../repository";
import { randomAnswerDTO } from "../interfaces/random/randomAnswerDTO";
import userRepository from "../repository/userRepository";
import { getFormattedDate } from "../common/utils/dateFormat";

const randomAnswerChoice = async () => {
  const randomList = await randomRepository.findAllRandomAnswer();

  const shuffleAnswer = (arr: randomAnswerDTO[]) => {
    arr.sort(() => Math.random() - 0.5);
  };
  shuffleAnswer(randomList);
  const random = randomList[0];
  return random;
};

const findQuickWorryList = async (userId: number) => {
  const user = userRepository.findUserById(userId);

  if (!user) {
    throw new ClientException("해당 유저가 존재하지 않습니다");
  }

  const quickWorryList = await randomRepository.findQuickWorryList(userId);

  const quickWorryListResponse = await Promise.all(
    quickWorryList.map(async (quickWorry: any) => {
      const data = {
        id: quickWorry.id,
        title: quickWorry.title,
        createdAt: getFormattedDate(quickWorry.createdAt)
      };
      return data;
    }),
  );
  return quickWorryListResponse;
};

export default { randomAnswerChoice, findQuickWorryList };