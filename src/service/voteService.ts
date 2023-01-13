import { withOption } from '@prisma/client';
import { ClientException } from "../common/error/exceptions/customExceptions";
import statusCode from "../constants/statusCode";
import { voteRepository, withOptionRepository, worryWithRepository } from "../repository"
import { CreateVoteDTO, findVoteDTO } from "../interfaces/vote/worryVoteDTO";
import { getFormattedDate } from "../common/utils/dateFormat";

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

    //TODO : 투표한 사람은 재투표 못하게

    await voteRepository.createWorryVote(createVoteDTO);

    await voteRepository.createWorryVote(createVoteDTO);
    //~ 해당 게시글의 선택지 id(optionId)를 가져온다.
    const findWithOptionByWorryWithId = await withOptionRepository.findOptionsWithWorryId(createVoteDTO.worryWithId);

    const destructurePlainDataInWorryWith = (worryWith: any) => {
        return {
            worryId: worryWith.id,
            title: worryWith.title,
            content: worryWith.content,
            finalOptionId: worryWith.finalOption,
            commentOn: worryWith.commentOn,
            commentCount: worryWith.commentCount
        };
    };

    //! isVoted 로직
    var isVoted: boolean = true;
    var percentage: number = 0;
    var countAllVote: number = 0;
    var loginUserVoteId: number | undefined = 0;

    //!TODO : 유저가 선택지 하나만 투표할 수 있도록
    for (var i = 0; i < findWithOptionByWorryWithId.length; i++) {
        const findVoteListByOptionId =
            await voteRepository.findVoteListByOptionId(findWithOptionByWorryWithId[i].id);
        countAllVote += findVoteListByOptionId.length;
    }

    //! percentage 계산 & option 작업
    const option: Array<object> = [];
    for (var i = 0; i < findWithOptionByWorryWithId.length; i++) {
        //~ 해당 게시글의 optionId당 vote 결과
        const findVoteListByOptionId =
            await voteRepository.findVoteListByOptionId(
                findWithOptionByWorryWithId[i].id
            );
        percentage = findVoteListByOptionId.length / countAllVote;
        option.push({
            id: findWithOptionByWorryWithId[i].id,
            worryWithId: findWithOptionByWorryWithId[i].worryWithId,
            title: findWithOptionByWorryWithId[i].title,
            image: findWithOptionByWorryWithId[i].image,
            hasImage: findWithOptionByWorryWithId[i].hasImage,
            percentage: Math.round(percentage * 100),
        });
    }

    const worryWithData = {
        ...destructurePlainDataInWorryWith(worryWith),
        createdAt: getFormattedDate(worryWith.createdAt),
        isAuthor: worryWith.userId == createVoteDTO.userId ? true : false,
        option,
        isVoted,
        loginUserVoteId,
    };
    return worryWithData;
};

const findWorryVoteByUserId = async (findVoteDTO: findVoteDTO) => {
    return await voteRepository.findVoteListByOptionId(findVoteDTO.userId);
};

export default { createWorryVote, findWorryVoteByUserId };