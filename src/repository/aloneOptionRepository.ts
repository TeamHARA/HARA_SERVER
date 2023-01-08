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

const updateIsSelectedById = async (id: number, isSelected: boolean) => {
  await prisma.aloneOption.update({
    where: {
      id
    },
    data: {
      isSelected
    }
  })
}


const findOptionsAloneWorryId =async (aloneWorryId:number) => {
  return await prisma.aloneOption.findMany({
    where:{
      worryAloneId: aloneWorryId
    },
  });
}


export default {
  findById,
  findByIdAndWorryId,
  updateIsSelectedById,
  findOptionsAloneWorryId
};
