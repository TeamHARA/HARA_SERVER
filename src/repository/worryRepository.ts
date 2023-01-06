import { PrismaClient, worryWith } from "@prisma/client";
import prisma from "./prismaClient";

// 카테고리 해당 id 값에 대해서
const findWorryListByCategoryId = async (categoryId?: number) => {
    const worries = await prisma.worryWith.findMany({
        where: {
            categoryId: categoryId
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

    // response객체를 flattening을 해주는 작업
    const worryResponse = await Promise.all(
        worries.map(async (worryWith: any) => {
            const data = {
                worryId: worryWith.id,
                title: worryWith.title,
                content: worryWith.content,
                createdAt: worryWith.createdAt,
                category: worryWith.category.name,
                selectedOptionId: worryWith.finalOption,
                isAuthor: worryWith.isAuthor,
                isVoted: worryWith.isVoted,
                commentOn: worryWith.commentOn,
                commentCount: worryWith.commentCount,
                option: worryWith.withOption
            };
            return data;
        }),
    );
    return worryResponse;
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
    });

    // response객체를 flattening을 해주는 작업
    const worryResponse = await Promise.all(
        worries.map(async (worryWith: any) => {
            const data = {
                worryId: worryWith.id,
                title: worryWith.title,
                content: worryWith.content,
                createdAt: worryWith.createdAt,
                category: worryWith.category.name,
                selectedOptionId: worryWith.finalOption,
                isAuthor: worryWith.isAuthor,
                isVoted: worryWith.isVoted,
                commentOn: worryWith.commentOn,
                commentCount: worryWith.commentCount,
                option: worryWith.withOption
            };
            return data;
        }),
    );
    return worryResponse;
}

export default { findWorryListByCategoryId, findWorries };