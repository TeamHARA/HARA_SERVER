import { withOption } from "@prisma/client";
import prisma from "./prismaClient";

const findById = async (id: number): Promise<withOption | null> => {
  return await prisma.withOption.findUnique({
    where: {
      id
    }
  });
};

const findOptionsWithWorryId = async (worryWithId: number) => {
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
  findOptionsWithWorryId
};

