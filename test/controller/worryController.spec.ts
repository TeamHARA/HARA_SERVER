import { PrismaClient } from "@prisma/client";
import request from 'supertest';
import app from '../testApp';
import { worryWith, withOption, vote } from "@prisma/client";

const prisma = new PrismaClient();

describe("GET /worry/:categoryId", () => {
    it("올바른 응답", async () => {
        const response = await request(app)
            .get("/worry/0")
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("고민글 조회 성공");

    });
});

describe("POST /worry", () => {
    let createdWithWorry: worryWith;
    let createdOption: withOption;
    let vote: vote | null;
    beforeAll(async () => {
        createdWithWorry = await prisma.worryWith.create({
            data: {
                title: "제목",
                content: "내용",
                categoryId: 1,
                userId: 5,
            },
        });
        createdOption = await prisma.withOption.create({
            data: {
                worryWithId: createdWithWorry.id,
                title: "선택지다 이놈앙",
            },
        });
    });
    afterAll(async () => {
        await prisma.worryWith.update({
            where: {
                id: createdWithWorry.id,
            },
            data: {
                finalOption: null,
            },
        });
        vote = await prisma.vote.findFirst({
            where: {
                optionId: createdOption.id,
            },
        });
        if (vote) {
            await prisma.vote.delete({
                where: {
                    id: vote.id
                },
            });
        }
        await prisma.withOption.delete({
            where: {
                id: createdOption.id,
            },
        });
        await prisma.worryWith.delete({
            where: {
                id: createdWithWorry.id,
            },
        });
    });
    test("투표 하기 완료", async () => {
        const response = await request(app)
            .post("/worry")
            .send({ "worryWithId": createdWithWorry.id, "userId": 3, "optionId": createdOption.id });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("투표 생성 성공");
    });
})

