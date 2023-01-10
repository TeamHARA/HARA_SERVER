import { Router } from "express";
import { worryWithController } from "../controller";
import { auth, validation } from "../middlwares";
import { body } from "express-validator";

const router = Router();

router.patch("/", auth, worryWithController.updateFinalOption);
router.post(
  "/",
  auth,
  [
    body("title").notEmpty(),
    body("content").notEmpty(),
    body("commentOn").notEmpty(),
    body("categoryId").notEmpty(),
    body("options").notEmpty(),
  ],
  validation,
  worryWithController.postWithWorry
);
router.get("/list/:ifSolved", auth, worryWithController.getWithWorry);
router.get("/:withWorryId", auth, worryWithController.getWithWorryDetail);

export default router;
