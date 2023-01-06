import { Router } from "express";
import worryRouter from "./worryRouter";
import worryWithRouter from "./worryWithRouter";
import randomRouter from "./randomRouter";

const router: Router = Router();

router.use("/worry", worryRouter);
router.use("/worry/with", worryWithRouter);
router.use("/random", randomRouter);

export default router;
