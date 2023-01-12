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
            optionId,
        }
    });
}

const findVoteByWorryWithId = async (optionId: number) => {
    return await prisma.vote.findFirst({
        where: {
            optionId,
        },
        orderBy: {
            id: "desc"
        }
    });
}

export default { createWorryVote, findVoteListByOptionId, findVoteByWorryWithId };