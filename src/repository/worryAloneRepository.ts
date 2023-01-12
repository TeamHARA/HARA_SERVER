import { CreateAloneWorryDTO } from "../interfaces/worryAlone/CreateAloneWorryDTO";
import { worryAlone } from "@prisma/client";

import prisma from "./prismaClient";

/* 혼자고민생성 */
const createAloneWorry = async (createAloneWorryDTO: CreateAloneWorryDTO) => {
  const worryData = await prisma.worryAlone.create({
    data: {
      title: createAloneWorryDTO.title,
      content: createAloneWorryDTO.content,
      categoryId: createAloneWorryDTO.categoryId,
      userId: createAloneWorryDTO.userId,
    },
  });

  const options = createAloneWorryDTO.options;

  for (var i = 0; i < options.length; i++) {
    const optionData = await prisma.aloneOption.create({
      data: {
        worryAloneId: worryData.id,
        title: options[i].title,
        advantage: options[i].advantage,
        disadvantage: options[i].disadvantage,
        image: options[i].image,
      },
    });
  } //for

  return worryData;
};
const findAloneWorries = async () => {
  const worries = await prisma.worryAlone.findMany({
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
  const optionNumber = await prisma.worryAlone.findMany({
    select: {
      finalOption: true,
      createdAt: true,
    },
  });
};

const findById = async (id: number) => {
  return await prisma.worryAlone.findUnique({
    where: {
      id,
    },
  });
};

const updateFinalOption = async (
  aloneWorryId: number,
  chosenOptionId: number
) => {
  await prisma.worryAlone.update({
    where: {
      id: aloneWorryId,
    },
    data: {
      finalOption: chosenOptionId,
    },
  });
};

const findAloneWorryDetail = async (aloneWorryId: number) => {
  return await prisma.worryAlone.findUnique({
    where: {
      id: aloneWorryId,
    },
  });
};

const deleteAloneWorryById = async (deleteId: number) => {
  await prisma.worryAlone.delete({
    where: {
      id: deleteId,
    },
  });
};

export default {
  createAloneWorry,
  updateFinalOption,
  findById,
  findFinalOption,
  findAloneWorries,
  findAloneWorryDetail,
  deleteAloneWorryById,
};
