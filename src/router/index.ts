import { Router } from "express";
import worryRouter from "./worryRouter";
import worryWithRouter from './worryWithRouter';

const router: Router = Router();

router.use("/worry", worryRouter);
router.use('/worry/with', worryWithRouter);

export default router;
