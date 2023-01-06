import { Router } from 'express';
import { worryWithController } from '../controller';
import { auth } from '../middlwares';

const router = Router();

router.patch('/', auth, worryWithController.updateFinalOption);
router.post("/",auth, worryWithController.createWithWorry);
router.get(":/worryId",auth, worryWithController.findWithWorry);

export default router;