import request from 'supertest';
import app from '../testApp';

describe("PATCH /worry/with", () => {
  it("올바른 응답", async () => {
    const response = await request(app)
      .patch("/api/worry/with")
      .send({ worryWithId: 2, chosenOptionId: 2 });
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({ status: 200, success: true, message: "나의고민 최종결정 성공" });
  }); 
})
