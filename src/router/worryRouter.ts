import { Router } from "express";
import { worryController } from "../controller";

const worryRouter: Router = Router();

worryRouter.get("/:categoryId", worryController.findWorryListByCategory);

export default worryRouter;