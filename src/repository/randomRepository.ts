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

export default { findAllRandomAnswer };
