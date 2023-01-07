import { Router } from "express";
import { worryAloneController } from "../controller";
import { auth, validation } from "../middlwares";
import { body } from "express-validator";

const router: Router = Router();

router.get(
  "/",
  auth,
  [body("ifSolved").notEmpty()],
  validation,
  worryAloneController.getAloneWorry
);
//[POST] worry/alone
router.post(
  "/",
  auth,
  [
    body("title").notEmpty(),
    body("content").notEmpty(),
    body("categoryId").notEmpty(),
    body("options").notEmpty(),
  ],
  validation,
  worryAloneController.createAloneWorry
);

router.patch("/",
  auth,
  [
    body("userId").notEmpty(),
    body("worryAloneId").notEmpty(),
    body("chosenOptionId").notEmpty()
  ],
  worryAloneController.patchWorryAlone);

export default router;
