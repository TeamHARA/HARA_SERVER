import { Router } from "express";
import { worryAloneController } from "../controller";


const router: Router = Router();


//[POST] worry/alone
router.post("/",worryAloneController.createAloneWorry);

export default router;
