import { CreateVoteDTO, findVoteDTO } from '../interfaces/vote/worryVoteDTO';
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

const findVoteListByOptionId = async (optionId: number) => {
    return await prisma.vote.findMany({
        where: {
            optionId
        }
    });
}

const findVoteByOptionId = async (optionId: number, userId: number) => {
    return await prisma.vote.findFirst({
        where: {
            optionId,
            userId
        }
    });
}

export default { createWorryVote, findVoteListByOptionId, findVoteByOptionId };