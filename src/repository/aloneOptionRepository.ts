import prisma from "./prismaClient";

const findById = async (id: number) => {
  return await prisma.aloneOption.findUnique({
    where: { id }
  });
}

export default {
  findById
};
