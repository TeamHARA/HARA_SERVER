import { ClientException } from "../common/error/exceptions/customExceptions";
import statusCode from "../constants/statusCode";
import { worryRepository, categoryRepository } from "../repository"

const getWorryListByCategoryId = async (categoryId: number) => {
    const worryWithList = (categoryId == 0) ? await worryRepository.getWorries() : await worryRepository.getWorryListByCategoryId(categoryId);

    const categoryList = await categoryRepository.getCategoryId();

    if (!worryWithList) {
        throw new ClientException("해당 게시글이 없습니다.");
    }

    if (!categoryList) {
        throw new ClientException("카테고리가 없습니다.");
    }

    if (categoryList.length == 0 || +categoryId > categoryList.length || +categoryId < 0) {
        throw new ClientException("해당 카테고리의 글이 없습니다.");
    }

    return worryWithList;
};

export default { getWorryListByCategoryId };