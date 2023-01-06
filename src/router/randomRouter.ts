import { Router } from "express";
import { randomController } from "../controller";

const router = Router();

router.get("/", randomController.getRandomAnswer);

export default router;
