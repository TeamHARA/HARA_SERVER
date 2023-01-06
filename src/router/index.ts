import { Router } from "express";
import worryRouter from "./worryRouter";
import worryWithRouter from './worryWithRouter';
import worryAloneRouter from './worryAloneRouter';

const router: Router = Router();

router.use("/worry", worryRouter);
router.use('/worry/with', worryWithRouter);
router.use("/worry/alone",worryAloneRouter);

export default router;
