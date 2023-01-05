import { Router } from "express";
import worryWithRouter from './worryWithRouter';
import worryAloneRouter from './worryAloneRouter';

const router: Router = Router();

router.use('/worry/with', worryWithRouter);
router.use("/worry/alone",worryAloneRouter);

export default router;
