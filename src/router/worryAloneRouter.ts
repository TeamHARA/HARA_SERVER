import { Router } from "express";
import { worryAloneController } from "../controller";
import { auth, validation } from '../middlwares';
import { body } from "express-validator";

const router: Router = Router();


//[POST] worry/alone
router.post("/",
[body("title").notEmpty(),
body("content").notEmpty(), 
body("categoryId").notEmpty(),
body("options").notEmpty()]
, auth
, validation
, worryAloneController.postAloneWorry);

export default router;
