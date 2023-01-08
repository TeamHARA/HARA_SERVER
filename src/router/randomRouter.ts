import { Router } from "express";
import { randomController } from "../controller";
import { auth } from "../middlwares";

const router = Router();

router.get("/", randomController.getRandomAnswer);
router.get("/list", auth, randomController.findQuickWorryList);

export default router;
