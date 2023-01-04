import { Router } from "express";
import worryWithRouter from './worryWithRouter';

const router: Router = Router();

router.use('/worryWith', worryWithRouter);

export default router;
