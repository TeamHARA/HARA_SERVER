import { Router } from "express";
import { worryWithController } from "../controller";
import { auth, validation } from "../middlwares";
import { body } from "express-validator";

const router = Router();

router.get("/list/:ifSolved", auth, worryWithController.getWithWorry);
router.patch("/", auth, worryWithController.updateFinalOption);
router.put("/", auth, worryWithController.deleteWithWorry);
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
  worryWithController.postWithWorry
);
router.get("/:withWorryId", auth, worryWithController.getWithWorryDetail);
router.post("/comment",
auth,
[
  body("withWorryId").notEmpty(),
  body("userId").notEmpty(),
  body("content").notEmpty(),
  body("isAnonymous").notEmpty(),
],
validation,
worryWithController.postWithWorryComment);

export default router;
