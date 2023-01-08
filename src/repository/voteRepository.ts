import { CreateVoteDTO, findVoteDTO } from '../worryVoteDTO';
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
        },
        orderBy: {
            id: "asc"
        }
    });
}

export default { createWorryVote, findVoteListByOptionId };