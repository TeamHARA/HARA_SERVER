import { Router } from 'express';
import { worryWithController } from '../controller';
import { auth } from '../middlwares';

const router = Router();

router.patch('/', auth, worryWithController.updateFinalOption);

export default router;