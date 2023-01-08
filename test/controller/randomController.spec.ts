import { PrismaClient } from '@prisma/client';
import request from "supertest";
import app from "../testApp";

const prisma = new PrismaClient();

describe("GET /random", () => {
  it("올바른 응답", async () => {
    const response = await request(app).get("/api/random");
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual("랜덤 답변 조회 성공");
  });
});

describe("GET /random/list", () => {
  it("올바른 응답", async () => {
    const response = await request(app).get("/api/random/list");
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual("과거고민 목록 조회 성공");
  })
});