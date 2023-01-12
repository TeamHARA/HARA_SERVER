import { PrismaClient, category } from "@prisma/client";
import prisma from "./prismaClient";

const getCategoryId = async () => {
    const categories = await prisma.category.findMany({
        select: {
            id: true
        },
    });
    return categories;
};

const getCategoryById = async (categoryId: number) => {
    return await prisma.category.findUnique({
        where: { id: categoryId },
    });
}

export default {
    getCategoryId,
    getCategoryById,
};