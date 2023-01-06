import { randomAnswer } from "@prisma/client";
import prisma from "./prismaClient";

const findAllRandomAnswer = async () => {
  const data = await prisma.randomAnswer.findMany({
    select: {
      id: true,
      content: true,
    },
  });
  return data;
};

export default { findAllRandomAnswer };
