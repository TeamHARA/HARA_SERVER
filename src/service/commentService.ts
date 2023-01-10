import commentRepository from '../repository/commentRepository';
import { CreateCommentDTO } from './../interfaces/worryWith/CreateCommentDTO';
import { rm } from './../constants';
import { ClientException } from '../common/error/exceptions/customExceptions';

const createWithWorryComment =async (createCommentDTO :CreateCommentDTO) => {
    const createdComment = await commentRepository.createWithWorryComment(createCommentDTO);
  
    if(!createdComment){
        throw new ClientException(rm.CREATE_WITH_WORRY_COMMENT_ERROR);
    }

    return createdComment;
};

export default{
    createWithWorryComment,
}