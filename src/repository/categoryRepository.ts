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

export default { getCategoryId };