import { Router } from "express";
import { worryController } from "../controller";
import { auth } from '../middlwares';

const worryRouter: Router = Router();

worryRouter.get("/:categoryId", auth, worryController.findWorryListByCategory);
worryRouter.post("/", auth, worryController.createWorryVote);

export default worryRouter;