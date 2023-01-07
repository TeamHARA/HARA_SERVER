import prisma from "./prismaClient";

const findById = async (id: number) => {
  return await prisma.aloneOption.findUnique({
    where: { id }
  });
}

const findByIdAndWorryId = async (id: number, worryId: number) => {
  return await prisma.aloneOption.findFirst({
    where: {
      id,
      worryAloneId: worryId
    }
  });
}


export default {
  findById,
  findByIdAndWorryId
};
