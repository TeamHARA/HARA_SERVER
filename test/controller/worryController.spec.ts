import request from 'supertest';
import app from '../testApp';

describe("GET /worry/:categoryId", () => {
    it("올바른 응답", async () => {
        const response = await request(app)
            .get("/api/worry/1")
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("고민글 조회 성공");
    })
    it("잘못된 응답", async () => {
        const response = await request(app)
            .get("/api/worry/10000")
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual("고민글 조회 실패");
    })
})