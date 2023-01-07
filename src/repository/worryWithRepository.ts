import { PrismaClient, worryWith } from "@prisma/client";
import { CreateWithWorryDTO } from "../interfaces/worryWith/CreateWithWorryDTO";
import prisma from "./prismaClient";

// 카테고리 해당 id 값에 대해서
const findWorryListByCategoryId = async (categoryId?: number) => {
  const worries = await prisma.worryWith.findMany({
    where: {
      categoryId: categoryId
    },
    orderBy: {
      id: "asc"
    },
    include: {
      category: true,
      withOption: {
        select: {
          id: true,
          worryWithId: true,
          title: true,
          image: true,
          hasImage: true
        }
      },
    },
  });
  return worries;
}

// 카테고리 : 전체 
const findWorries = async () => {
  const worries = await prisma.worryWith.findMany({
    include: {
      category: true,
      withOption: {
        select: {
          id: true,
          worryWithId: true,
          title: true,
          image: true,
          hasImage: true
        }
      },
    },
    orderBy: {
      id: "asc"
    },
  });
  return worries;
}

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

const createWithWorry = async (createWithWorryDTO: CreateWithWorryDTO) => {

  const worryData = await prisma.worryWith.create({
    data: {
      title: createWithWorryDTO.title,
      content: createWithWorryDTO.content,
      finalOption: null,
      categoryId: createWithWorryDTO.categoryId,
      userId: createWithWorryDTO.userId,
      commentOn: createWithWorryDTO.commentOn,
      isAuthor: true, //일단은 true 로 해놨음..      
    }
  });

  const options = createWithWorryDTO.options;

  for (var i = 0; i < options.length; i++) {
    const optionData = await prisma.withOption.create({
      data: {
        worryWithId: worryData.id,
        title: options[i].title,
        advantage: options[i].advantage,
        disadvantage: options[i].disadvantage,
        image: options[i].image,
        hasImage: options[i].hasImage,
      }
    });
  }//for 

  return worryData;
}

export default { findById, updateFinalOptionById, findWorryListByCategoryId, findWorries, createWithWorry };
