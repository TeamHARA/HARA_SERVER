import { Router } from "express";
import { worryAloneController } from "../controller";
import { auth, validation } from "../middlwares";
import { body } from "express-validator";

const router: Router = Router();

router.get("/list/:ifSolved", auth, worryAloneController.getAloneWorry);
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
  worryAloneController.postAloneWorry
);

router.put("/", auth, worryAloneController.deleteAloneWorry);

router.patch(
  "/",
  auth,
  [
    body("userId").notEmpty(),
    body("worryAloneId").notEmpty(),
    body("chosenOptionId").notEmpty(),
  ],
  validation,
  worryAloneController.patchAloneWorry
);

router.get("/:aloneWorryId", auth, worryAloneController.getAloneWorryDetail);

export default router;
