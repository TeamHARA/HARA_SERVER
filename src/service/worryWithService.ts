
import { ClientException } from "../common/error/exceptions/customExceptions";
import statusCode from "../constants/statusCode";
import { withOptionRepository, worryWithRepository } from "../repository"

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

export default { chooseFinalOption };