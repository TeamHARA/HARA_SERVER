import request, { Response } from 'supertest';
import { prismaMock } from '../testDBclient';
import app from '../testApp';

describe("PATCH /worry/alone - 혼자 고민 결정하기", () => {
  describe("올바른 요청일 경우", () => {
    let response: Response;
    beforeAll(async () => {
      const mockWorry = { id: 7, title: 'dd', createdAt: new Date(), updatedAt: new Date(), categoryId: 1, userId: 3, content: null, finalOption: null };
      const mockOption = { id: 1, worryAloneId: 7, title: 'option title', disadvantage: null, advantage: null, image: null, hasImage: false };

      prismaMock.worryAlone.findUnique.mockResolvedValueOnce(mockWorry);
      prismaMock.worryAlone.update.mockResolvedValue({ ...mockWorry, finalOption: 7 });
      prismaMock.aloneOption.findFirst.mockResolvedValueOnce(mockOption);

      response = await request(app)
        .patch('/worry/alone')
        .send({ worryAloneId: 7, chosenOptionId: 7 });
    });
    it("200 응답을 반환한다.", async () => {
      expect(response.status).toBe(200);
    });
  });

  describe("이미 결정한 고민일 경우", () => {
    let response: Response;
    beforeAll(async () => {
      const mockWorry = { id: 7, title: 'dd', createdAt: new Date(), updatedAt: new Date(), categoryId: 1, userId: 3, content: null, finalOption: 7 };
      const mockOption = { id: 1, worryAloneId: 7, title: 'option title', disadvantage: null, advantage: null, image: null, hasImage: false };
      prismaMock.worryAlone.findUnique.mockResolvedValueOnce(mockWorry);
      prismaMock.aloneOption.findFirst.mockResolvedValueOnce(mockOption);
      
      response = await request(app)
        .patch('/worry/alone')
        .send({ worryAloneId: mockWorry.id, chosenOptionId: 1 });
    });

    it("400 에러를 반환한다.", () => {
      expect(response.status).toBe(400);
    });

    it("올바른 메시지를 전달한다.", () => {
      expect(response.body.message).toBe("이미 최종 결정된 고민글입니다.");
    });
  });

  describe("고민글이 존재하지 않으면", () => {
    let response: Response;

    beforeAll(async () => {
      prismaMock.worryAlone.findUnique.mockResolvedValueOnce(null);
      response = await request(app)
        .patch('/worry/alone')
        .send({ worryAloneId: 10, chosenOptionId: 1 });
    });

    it("400 에러를 반환한다.", () => {
      expect(response.status).toBe(400);
    });

    it("올바른 메시지를 전달한다.", () => {
      expect(response.body.message).toBe(
        "해당하는 아이디의 고민글이 존재하지 않습니다"
      );
    });
  });

  describe("작성자가 아닌 경우", () => {
    let response: Response;
    beforeAll(async () => {
      const mockWorry = { id: 7, title: 'dd', createdAt: new Date(), updatedAt: new Date(), categoryId: 1, userId: 10, content: null, finalOption: 7 };
      
      prismaMock.worryAlone.findUnique.mockResolvedValueOnce(mockWorry);
      response = await request(app)
        .patch('/worry/alone')
        .send({ worryAloneId: 7, chosenOptionId: 86 });
    });


    it("403 에러를 반환한다.", () => {
      expect(response.status).toBe(403);
    });

    it("올바른 메시지를 전달한다.", () => {
      expect(response.body.message).toBe("작성자가 아닙니다");
    });
  });

  describe("선택지 아이디가 올바르지 않은 경우", () => {
    let response: Response;


    beforeAll(async () => {
      const mockWorry = { id: 7, title: 'dd', createdAt: new Date(), updatedAt: new Date(), categoryId: 1, userId: 3, content: null, finalOption: null };
      prismaMock.worryAlone.findUnique.mockResolvedValueOnce(mockWorry);
      prismaMock.aloneOption.findFirst.mockResolvedValueOnce(null);
      
      response = await request(app)
        .patch('/worry/alone')
        .send({ worryAloneId: 7, chosenOptionId: 1 });
    });
    
    it("400 에러를 반환한다.", () => {
      expect(response.status).toBe(400);
    });

    it("올바른 메시지를 전달한다.", () => {
      expect(response.body.message).toBe('해당 고민글의 선택지 아이디가 아닙니다.');
    });
  });
});

describe("GET /worry/alone/list/0", () => {
  it("올바른 응답", async () => {
    prismaMock.worryAlone.findMany.mockResolvedValueOnce([]);
    const response = await request(app).get("/worry/alone/list/0");
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual("혼자고민 조회 성공");
  });
});

describe("GET /worry/alone/list/1", () => {
  it("올바른 응답", async () => {
    prismaMock.worryAlone.findMany.mockResolvedValueOnce([]);
    const response = await request(app).get("/worry/alone/list/1");
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual("혼자고민 조회 성공");
  });
});