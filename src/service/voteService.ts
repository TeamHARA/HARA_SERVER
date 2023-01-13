import { withOption } from '@prisma/client';
import { ClientException } from "../common/error/exceptions/customExceptions";
import statusCode from "../constants/statusCode";
import { voteRepository, withOptionRepository, worryWithRepository } from "../repository"
import { CreateVoteDTO, findVoteDTO } from "../interfaces/vote/worryVoteDTO";
import { getFormattedDate } from "../common/utils/dateFormat";
import worryWithService from './worryWithService';

const createWorryVote = async (createVoteDTO: CreateVoteDTO) => {

    const worryWith = await worryWithRepository.findById(createVoteDTO.worryWithId);

    if (!worryWith) {
        throw new ClientException("해당하는 아이디의 걱정글이 존재하지 않습니다");
    }

    const worryOption = await withOptionRepository.findById(createVoteDTO.optionId);

    if (!worryOption) {
        throw new ClientException("해당하는 아이디의 선택지가 존재하지 않습니다");
    }

    if (worryWith?.userId == createVoteDTO.userId) {
        throw new ClientException("자신의 고민글에는 투표할 수 없습니다", statusCode.FORBIDDEN);
    }

    const findVoteByOptionId = await voteRepository.findVoteByOptionId(worryOption.id, createVoteDTO.userId);

    if (findVoteByOptionId) {
        throw new ClientException("이미 투표한 글에는 재투표가 불가능합니다.", statusCode.FORBIDDEN);
    }

    await voteRepository.createWorryVote(createVoteDTO);
    

    const afterVoteResult = await worryWithService.findWorryListByCategoryId(worryWith.categoryId,createVoteDTO.userId);

    return afterVoteResult;

};

const findWorryVoteByUserId = async (findVoteDTO: findVoteDTO) => {
    return await voteRepository.findVoteListByOptionId(findVoteDTO.userId);
};

export default { createWorryVote, findWorryVoteByUserId };