import { Router } from "express";
import { getAllNotes } from "./controllers";

const apiRouter = Router();

apiRouter.get("/", getAllNotes);

export default apiRouter;
