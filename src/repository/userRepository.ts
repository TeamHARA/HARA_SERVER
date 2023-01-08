import prisma from "./prismaClient";

const findUserById = async (userId: number) => {
    return await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
};

export default { findUserById };