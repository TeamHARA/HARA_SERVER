import { Router } from 'express';
import { worryWithController } from '../controller';

const router = Router();

router.patch('/', worryWithController.updateFinalOption);

export default router;