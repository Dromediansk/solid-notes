import { Router } from "express";
import { getNotesByUserId } from "./controllers";

const apiRouter = Router();

apiRouter.get("/notes/:userId", getNotesByUserId);

export default apiRouter;
