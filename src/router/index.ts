import { Router } from "express";
import worryWithRouter from "./worryWithRouter";
import randomRouter from "./randomRouter";

const router: Router = Router();

router.use("/worry/with", worryWithRouter);
router.use("/random", randomRouter);

export default router;
