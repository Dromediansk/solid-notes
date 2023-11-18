import { Router } from "express";
import { getAllNotes } from "./controllers";

const apiRouter = Router();

apiRouter.get("/notes", getAllNotes);

export default apiRouter;
