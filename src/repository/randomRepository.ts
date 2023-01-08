import { randomAnswer } from "@prisma/client";
import prisma from "./prismaClient";

const findAllRandomAnswer = async () => {
  const randomAnswer = await prisma.randomAnswer.findMany({
    select: {
      id: true,
      content: true,
    },
  });
  return randomAnswer;
};

const findQuickWorryList = async (userId: number) => {
  return await prisma.quickWorry.findMany({
    select: {
      id: true,
      title: true,
      createdAt: true
    },
    where: {
      userId
    }
  });
}

export default { findAllRandomAnswer, findQuickWorryList };