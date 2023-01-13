import request, { Response } from 'supertest';
import app from '../testApp';

describe("[POST] /worry/alone - 혼자 고민 생성하기", () => {
  let response: Response;

  describe.only("올바른 요청일 경우", () => {
    
    beforeAll(async () => {
      response = await request(app)
          .post('/worry/alone')
          .send({ 
            "title": "제발 부탁이야...",
            "content": "진로 그거 어떻게 정하는건데..!",
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
        });

      // afterAll(async () => {
      //   await prisma.aloneOption.deleteMany({
      //     where: {
      //       worryAloneId: 2,
      //     },
      //   });
      //   await prisma.worryAlone.delete({
      //     where: {
      //       id: 2
      //     },
      //   });
      // });
  
      it("200 응답을 반환한다.", () => {
        expect(response.status).toBe(200);
      });
    });


  //에러뜨는 경우
  describe("제목이 없는 경우", () => {
    beforeAll(async () => {
      response = await request(app)
        .post('/worry/alone')
        .send({ 
          
          "content": "진로 그거 어떻게 정하는건데..!",
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
    });

    it("400 에러를 반환한다.", () => {
      expect(response.status).toBe(400);
    });

    it("올바른 메시지를 전달한다.", () => {
      expect(response.body.message).toBe('title 값이 비었습니다.');
    });
  });

});