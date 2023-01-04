import { PrismaClient, worryWith } from "@prisma/client";
import prisma from "./prismaClient";

const findById = async (id: number): Promise<worryWith | null> => {
  return prisma.worryWith.findUnique({
    where: {
      id
    }
  });
};

const updateFinalOptionById = async (id: number, optionId: number) => {
  await prisma.worryWith.update({
    where: {
      id
    },
    data: {
      finalOption: optionId
    }
  });
};

export default { findById, updateFinalOptionById };