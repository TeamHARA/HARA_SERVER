import prisma from "./prismaClient";

const findCommentByWithWorryId =async (worryWithId:number) => {
    return await prisma.comment.findMany({
        where: { worryWithId }
      });
};

export default{ findCommentByWithWorryId };