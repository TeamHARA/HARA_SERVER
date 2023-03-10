import { worryWith } from "@prisma/client";
import { CreateWithWorryDTO } from "../interfaces/worryWith/CreateWithWorryDTO";
import prisma from "./prismaClient";

// 카테고리 해당 id 값에 대해서
const findWorryListByCategoryId = async (categoryId?: number) => {
  const worries = await prisma.worryWith.findMany({
    where: {
      categoryId: categoryId,
    },
    orderBy: [
      {
        id: "desc",
      },
      {
        createdAt: "desc"
      }
    ],
    include: {
      category: true,
      withOption: {
        select: {
          id: true,
          worryWithId: true,
          title: true,
          image: true,
          hasImage: true,
          advantage: true,
          disadvantage: true,
        },
      },
    },
  });
  return worries;
};

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
          hasImage: true,
          advantage: true,
          disadvantage: true
        },
      },
    },
    orderBy: [
      {
        createdAt: "desc"
      },
      {
        id: "desc",
      }
    ],
  });
  return worries;
};

const findById = async (id: number): Promise<worryWith | null> => {
  return await prisma.worryWith.findUnique({
    where: {
      id,
    },
  });
};

const updateFinalOptionById = async (id: number, optionId: number) => {
  await prisma.worryWith.update({
    where: {
      id,
    },
    data: {
      finalOption: optionId,
    },
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
    },
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
  }

  return worryData;
};

const findWithWorryDetail = async (withWorryId: number) => {
  return await prisma.worryWith.findUnique({
    where: {
      id: withWorryId,
    },
  });
};

const findWithWorries = async () => {
  const worries = await prisma.worryWith.findMany({
    select: {
      id: true,
      categoryId: true,
      title: true,
      createdAt: true,
      finalOption: true,
    },
  });

  return worries;
};

const findFinalOption = async () => {
  const optionNumber = await prisma.worryWith.findMany({
    select: {
      finalOption: true,
      createdAt: true,
    },
  });
};

const deleteWithWorryById = async (deleteId: number) => {
  await prisma.worryWith.delete({
    where: {
      id: deleteId,
    },
  });
};

const findOptionIdsById = async (id: number) => {
  return await prisma.worryWith.findUnique({
    select: {
      withOption: true
    },
    where: {
      id,
    },
  });
};

export default {
  findWorryListByCategoryId,
  findWorries,
  findById,
  updateFinalOptionById,
  createWithWorry,
  findWithWorries,
  findFinalOption,
  findWithWorryDetail,
  //createWithWorryComment,
  deleteWithWorryById,
  findOptionIdsById
};
