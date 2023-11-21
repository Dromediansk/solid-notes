import { Router } from "express";
import { createNote, deleteNotes, getNotes } from "./controllers";

const apiRouter = Router();

apiRouter.post("/notes", createNote);
apiRouter.get("/notes", getNotes);
apiRouter.delete("/notes", deleteNotes);

export default apiRouter;
