import { IllegalStateException } from "../common/error/exceptions/customExceptions";
import { withOptionRepository, worryWithRepository } from "../repository"

const chooseFinalOption = async (worryWithId: number, optionId: number) => {
  const worryWith = await worryWithRepository.findById(worryWithId);
  if (!worryWith) {
    throw new IllegalStateException("해당하는 아이디의 걱정글이 존재하지 않습니다");
  }

  const chosenOption = await withOptionRepository.findById(optionId);
  if (!chosenOption) {
    throw new IllegalStateException("해당하는 아이디의 옵션이 존재하지 않습니다");
  }

  await worryWithRepository.updateFinalOptionById(worryWithId, optionId);
};

export default { chooseFinalOption };