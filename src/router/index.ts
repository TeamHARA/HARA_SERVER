import { Router } from "express";
import worryWithRouter from './worryWithRouter';

const router: Router = Router();

router.use('/worry/with', worryWithRouter);

export default router;
