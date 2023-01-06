import { Router } from 'express';
import { worryWithController } from '../controller';
import { auth, validation } from '../middlwares';
import { body } from "express-validator";


const router = Router();

router.patch('/', auth, worryWithController.updateFinalOption);
router.post("/",
[body("title").notEmpty(),
body("content").notEmpty(), 
body("commentOn").notEmpty(), 
body("categoryId").notEmpty(),
body("options").notEmpty()]
,auth
,validation
,worryWithController.postWithWorry);
router.get(":/worryId",auth, worryWithController.getWithWorry);

export default router;