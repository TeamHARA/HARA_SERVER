import { Router } from "express";
import { worryAloneController } from "../controller";
import { auth } from '../middlwares';

const router: Router = Router();


//[POST] worry/alone
router.post("/",auth, worryAloneController.createAloneWorry);

export default router;
