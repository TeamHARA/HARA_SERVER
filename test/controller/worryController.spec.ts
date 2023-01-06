import request from 'supertest';
import app from '../testApp';

describe("GET /worry/:categoryId", () => {
    it("올바른 응답", async () => {
        const response = await request(app)
            .get("/api/worry/0")
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual("고민글 조회 성공");
        // expect(response.body).toMatchObject({
        //     "status": 200,
        //     "success": true,
        //     "message": "고민글 조회 성공",
        //     "data": [
        //         {
        //             "worryId": 4,
        //             "title": "글자수 제한은 공백 포함 28자 글자수 제한은 공백",
        //             "content": "1. 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세 2. 남산 위에 저 소나무 철갑을 두른 듯 바람 서리 불변함은 우리 기상일세 무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세 3. 가을 하늘 공활한데 ...",
        //             "createdAt": "2023-01-04T18:02:16.820Z",
        //             "category": "일상",
        //             "selectedOptionId": 4,
        //             "isAuthor": false,
        //             "isVoted": false,
        //             "commentOn": false,
        //             "commentCount": 0,
        //             "option": [
        //                 {
        //                     "id": 5,
        //                     "worryWithId": 4,
        //                     "title": "sss",
        //                     "image": null,
        //                     "hasImage": false
        //                 },
        //                 {
        //                     "id": 6,
        //                     "worryWithId": 4,
        //                     "title": "dffff",
        //                     "image": null,
        //                     "hasImage": false
        //                 }
        //             ]
        //         },
        //         {
        //             "worryId": 3,
        //             "title": "fsdfdsfffdfdsfdsfds",
        //             "content": "dsfdsfdsff",
        //             "createdAt": "2023-01-05T03:00:50.000Z",
        //             "category": "일상",
        //             "selectedOptionId": 3,
        //             "isAuthor": false,
        //             "isVoted": false,
        //             "commentOn": true,
        //             "commentCount": 20,
        //             "option": [
        //                 {
        //                     "id": 3,
        //                     "worryWithId": 3,
        //                     "title": "s",
        //                     "image": null,
        //                     "hasImage": false
        //                 },
        //                 {
        //                     "id": 4,
        //                     "worryWithId": 3,
        //                     "title": "a",
        //                     "image": null,
        //                     "hasImage": false
        //                 }
        //             ]
        //         },
        //         {
        //             "worryId": 5,
        //             "title": "ddd",
        //             "content": "fsdfds",
        //             "createdAt": "2023-01-05T11:40:00.838Z",
        //             "category": "연애",
        //             "selectedOptionId": null,
        //             "isAuthor": false,
        //             "isVoted": false,
        //             "commentOn": false,
        //             "commentCount": 0,
        //             "option": [
        //                 {
        //                     "id": 7,
        //                     "worryWithId": 5,
        //                     "title": "s",
        //                     "image": null,
        //                     "hasImage": false
        //                 },
        //                 {
        //                     "id": 8,
        //                     "worryWithId": 5,
        //                     "title": "s",
        //                     "image": null,
        //                     "hasImage": false
        //                 }
        //             ]
        //         },
        //         {
        //             "worryId": 6,
        //             "title": "sdfsdfsdf",
        //             "content": "sdfsdf",
        //             "createdAt": "2023-01-05T11:40:00.838Z",
        //             "category": "연애",
        //             "selectedOptionId": null,
        //             "isAuthor": false,
        //             "isVoted": false,
        //             "commentOn": false,
        //             "commentCount": 0,
        //             "option": [
        //                 {
        //                     "id": 9,
        //                     "worryWithId": 6,
        //                     "title": "aa",
        //                     "image": null,
        //                     "hasImage": false
        //                 },
        //                 {
        //                     "id": 10,
        //                     "worryWithId": 6,
        //                     "title": "ss",
        //                     "image": null,
        //                     "hasImage": false
        //                 }
        //             ]
        //         },
        //         {
        //             "worryId": 7,
        //             "title": "sdf",
        //             "content": "dd",
        //             "createdAt": "2023-01-05T11:40:34.383Z",
        //             "category": "패션/뷰티",
        //             "selectedOptionId": null,
        //             "isAuthor": false,
        //             "isVoted": false,
        //             "commentOn": false,
        //             "commentCount": 0,
        //             "option": [
        //                 {
        //                     "id": 11,
        //                     "worryWithId": 7,
        //                     "title": "s",
        //                     "image": null,
        //                     "hasImage": false
        //                 },
        //                 {
        //                     "id": 12,
        //                     "worryWithId": 7,
        //                     "title": "s",
        //                     "image": null,
        //                     "hasImage": false
        //                 }
        //             ]
        //         },
        //         {
        //             "worryId": 8,
        //             "title": "aa",
        //             "content": "dd",
        //             "createdAt": "2023-01-05T11:40:34.383Z",
        //             "category": "패션/뷰티",
        //             "selectedOptionId": null,
        //             "isAuthor": false,
        //             "isVoted": false,
        //             "commentOn": false,
        //             "commentCount": 0,
        //             "option": [
        //                 {
        //                     "id": 13,
        //                     "worryWithId": 8,
        //                     "title": "s",
        //                     "image": null,
        //                     "hasImage": false
        //                 },
        //                 {
        //                     "id": 14,
        //                     "worryWithId": 8,
        //                     "title": "s",
        //                     "image": null,
        //                     "hasImage": false
        //                 }
        //             ]
        //         },
        //         {
        //             "worryId": 9,
        //             "title": "aa",
        //             "content": "dd",
        //             "createdAt": "2023-01-05T11:40:34.383Z",
        //             "category": "커리어",
        //             "selectedOptionId": null,
        //             "isAuthor": false,
        //             "isVoted": false,
        //             "commentOn": false,
        //             "commentCount": 0,
        //             "option": [
        //                 {
        //                     "id": 15,
        //                     "worryWithId": 9,
        //                     "title": "s",
        //                     "image": null,
        //                     "hasImage": false
        //                 },
        //                 {
        //                     "id": 16,
        //                     "worryWithId": 9,
        //                     "title": "s",
        //                     "image": null,
        //                     "hasImage": false
        //                 }
        //             ]
        //         },
        //         {
        //             "worryId": 10,
        //             "title": "aa",
        //             "content": "dsfdf",
        //             "createdAt": "2023-01-05T11:40:34.383Z",
        //             "category": "커리어",
        //             "selectedOptionId": null,
        //             "isAuthor": false,
        //             "isVoted": false,
        //             "commentOn": false,
        //             "commentCount": 0,
        //             "option": []
        //         },
        //         {
        //             "worryId": 2,
        //             "title": "함께 고민 더미를 만들까요 말까요?",
        //             "content": "만들지 말지 고민입니다.",
        //             "createdAt": "2023-01-04T08:02:35.300Z",
        //             "category": "일상",
        //             "selectedOptionId": 2,
        //             "isAuthor": false,
        //             "isVoted": false,
        //             "commentOn": false,
        //             "commentCount": 10,
        //             "option": [
        //                 {
        //                     "id": 1,
        //                     "worryWithId": 2,
        //                     "title": "올려",
        //                     "image": null,
        //                     "hasImage": false
        //                 },
        //                 {
        //                     "id": 2,
        //                     "worryWithId": 2,
        //                     "title": "말아",
        //                     "image": null,
        //                     "hasImage": false
        //                 }
        //             ]
        //         }
        //     ]
        // });
    })
    it("카테고리 번호가 없는 경우", async () => {
        const response = await request(app)
            .get("/api/worry/10000")
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual("없는 카테고리입니다");
    })
})

describe("POST /worry", () => {
    // it("투표 하기 완료", async () => {
    //     const response = await request(app)
    //         .post("/api/worry")
    //         .send({ "worryWithId": 3, "userId": 4, "optionId": 5 });
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body).toMatchObject({ status: 200, success: true, message: "투표 생성 성공" });
    // })
    it("고민글 유저와 로그인 유저가 같을때 투표할 경우", async () => {
        const response = await request(app)
            .post("/api/worry")
            .send({ "worryWithId": 3, "userId": 3, "optionId": 5 });
        expect(response.statusCode).toBe(403);
        expect(response.body).toMatchObject({
            status: 403,
            success: false,
            message: "자신의 고민글에는 투표할 수 없습니다"
        });
    });
})
