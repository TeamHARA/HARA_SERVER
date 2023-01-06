import { Router } from "express";
import { worryAloneController } from "../controller";
import { auth } from '../middlwares';
import { body } from "express-validator";

const router: Router = Router();


//[POST] worry/alone
router.post("/",auth,[body("userId").notEmpty(), body("title").notEmpty(),
body("content").notEmpty(), body("categoryId").notEmpty(),
body("options").notEmpty()]
,worryAloneController.createAloneWorry);

export default router;
