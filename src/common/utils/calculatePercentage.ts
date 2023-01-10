import { withOption } from '@prisma/client';
import { voteRepository } from '../../repository';
export const calculatePercentage = async (options: withOption[]) => {

    var countAllVotes: number = 0;
    var lengthArray = [];
    var percentageArray = [];

    for (var i = 0; i < options.length; ++i) {
        const findVoteListByOptionId = await voteRepository.findVoteListByOptionId(options[i].id);
        countAllVotes += findVoteListByOptionId.length;
        lengthArray.push(findVoteListByOptionId.length);
    }

    for (var i = 0; i < options.length; ++i) {
        const percent = lengthArray[i] / countAllVotes;
        const roundedPercent =  Math.round(percent * 100);
        percentageArray.push(roundedPercent);
    }

    return percentageArray;
}