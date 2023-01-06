import { ClientException } from "../common/error/exceptions/customExceptions";
import statusCode from "../constants/statusCode";
import { worryRepository, categoryRepository } from "../repository"

const isTotal = (categoryId: number): boolean => categoryId === 0;

const findWorryListByCategoryId = async (categoryId: number) => {
    const worryWithList = isTotal(categoryId) ? await worryRepository.findWorries() : await worryRepository.findWorryListByCategoryId(categoryId);

    const categoryList = await categoryRepository.getCategoryId();

    if (!categoryList) {
        throw new ClientException("카테고리가 없습니다.");
    }

    if (+categoryId > categoryList.length || +categoryId < 0) {
        throw new ClientException("없는 카테고리입니다");
    }

    return worryWithList;
};

export default { findWorryListByCategoryId };