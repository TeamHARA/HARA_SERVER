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
      .patch("/worry/with")
      .send({ worryWithId: createdWithWorry.id, chosenOptionId: createdOption.id });
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({ status: 200, success: true, message: "나의고민 최종결정 성공" });
  });
})

describe.only("POST /worry/with", () => {
  let createdWithWorry: worryWith;
  let createdOption: withOption;

  it("올바른 응답", async () => {
    const response = await request(app)
      .post("/worry/with")
      .send({
        "title":"진로를 결정하고 싶어요 흑흑",
        "content": "진로 그거 어떻게 정하는건데..!",
        "commentOn": false,
        "categoryId": 1,
        "options": [
          {
            "title": "선택지 제목",
            "advantage": "장점의 이유",
            "disadvantage": "단점의 이유",
            "image": "",
            "hasImage": false
          },
          {
            "title": "선택지 제목",
            "advantage": "장점의 이유",
            "disadvantage": "단점의 이유",
            "image": "image",
            "hasImage": true
          },
          {
            "title": "선택지 제목",
            "advantage": "장점의 이유",
            "disadvantage": "단점의 이유",
            "image": "image",
            "hasImage": true
          }
        ]
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({ status: 200, success: true, message: "함께고민 업로드 성공" });
  });

}
)