import { Router } from "express";
import worryRouter from "./worryRouter";
import worryWithRouter from "./worryWithRouter";
import worryAloneRouter from "./worryAloneRouter";
import randomRouter from "./randomRouter";

const router: Router = Router();

router.use("/worry/with", worryWithRouter);
router.use("/worry/alone", worryAloneRouter);
router.use("/worry", worryRouter);
router.use("/random", randomRouter);

export default router;
