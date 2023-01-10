import { CreateCommentDTO } from "../interfaces/worryWith/CreateCommentDTO";
import prisma from "./prismaClient";

const findCommentByWithWorryId =async (worryWithId:number) => {
    return await prisma.comment.findMany({
        where: { worryWithId }
      });
};

const createWithWorryComment =async (createCommentDTO: CreateCommentDTO) => {
  
  return await prisma.comment.create({
    data : {
      worryWithId: createCommentDTO.withWorryId,
      content: createCommentDTO.content,
      userId: createCommentDTO.userId,
      isAnonymous: createCommentDTO.isAnonymous,
    }

  })
}

export default{ 
  findCommentByWithWorryId,
  createWithWorryComment
};