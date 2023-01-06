import { CreateVoteDTO } from '../createWorryVoteDTO';
import { PrismaClient, worryWith } from "@prisma/client";
import prisma from "./prismaClient";


const createWorryVote = async (createVoteDTO: CreateVoteDTO) => {

    await prisma.vote.create({
        data: {
            userId: createVoteDTO.userId,
            optionId: createVoteDTO.optionId
        }
    });
};

export default { createWorryVote };