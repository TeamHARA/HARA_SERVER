import { withOption } from "@prisma/client";
import prisma from "./prismaClient";

const findById = async (id: number): Promise<withOption | null> => {
  return await prisma.withOption.findUnique({
    where: {
      id
    }
  });
};


const findOptionsWithWorryId =async (withWorryId:number) => {
  return await prisma.withOption.findMany({
    where:{
      worryWithId: withWorryId
    },
  });
}


const findByWorryWithId = async (worryWithId: number) => {
  return await prisma.withOption.findMany({
    where: {
      worryWithId
    },
    orderBy: {
      id: "asc"
    }
  });
};

export default { 
  findById,
  findByWorryWithId,
  findOptionsWithWorryId
};

