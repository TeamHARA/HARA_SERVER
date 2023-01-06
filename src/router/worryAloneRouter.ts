import { Router } from "express";
import { worryAloneController } from "../controller";
import { auth } from '../middlwares';
import { body } from "express-validator";

const router: Router = Router();


//[POST] worry/alone
router.post("/",
[body("title").notEmpty().withMessage("제목이 비었습니다."),
body("content").notEmpty().withMessage("내용이 비었습니다."), 
body("categoryId").notEmpty().withMessage("카테고리 아이디가 비었습니다."),
body("options").notEmpty().withMessage("선택지가 비었습니다.")]
, auth
,worryAloneController.createAloneWorry);

export default router;
