import { PrismaClient, worryWith } from "@prisma/client";
import { CreateWithWorryDTO } from "../interfaces/worryWith/CreateWithWorryDTO";
import prisma from "./prismaClient";

const findById = async (id: number): Promise<worryWith | null> => {
  return prisma.worryWith.findUnique({
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
      isAuthor: true, //일단은 true 로 해놨음..
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
      },
    });
  } //for

  return worryData;
};
const findWithWorries = async () => {
  const worries = await prisma.worryWith.findMany({
    select: {
      id: true,
      categoryId: true,
      content: true,
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

export default {
  findById,
  updateFinalOptionById,
  createWithWorry,
  findWithWorries,
  findFinalOption,
};
