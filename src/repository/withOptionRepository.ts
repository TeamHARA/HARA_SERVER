import { withOption } from "@prisma/client";
import prisma from "./prismaClient";

const findById = async (id: number): Promise<withOption | null> => {
  return await prisma.withOption.findUnique({
    where: {
      id
    }
  });
};

export default { findById };