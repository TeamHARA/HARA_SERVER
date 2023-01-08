import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import app from '../testApp';
import { worryWith, withOption } from '@prisma/client';

const prisma = new PrismaClient();

describe("PATCH /worry/with", () => {
  let createdWithWorry: worryWith;
  let createdOption: withOption;

  beforeAll(async () => {
    createdWithWorry = await prisma.worryWith.create({
      data: {
        title: '제목',
        content: '내용',
        categoryId: 1,
        userId: 3
      }
    });

    createdOption = await prisma.withOption.create({
      data: {
        worryWithId: createdWithWorry.id,
        title: '선택지다 이놈앙'
      }
    })
  });

  afterAll(async () => {
    await prisma.worryWith.update({
      where: {
        id: createdWithWorry.id
      },
      data: {
        finalOption: null
      }
    });
    await prisma.withOption.delete({
      where: {
        id: createdOption.id
      }
    });
    await prisma.worryWith.delete({
      where: {
        id: createdWithWorry.id
      }
    });
  });

  it("올바른 응답", async () => {
    const response = await request(app)
      .patch("/api/worry/with")
      .send({ worryWithId: createdWithWorry.id, chosenOptionId: createdOption.id });
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({ status: 200, success: true, message: "나의고민 최종결정 성공" });
  }); 
})
