import { Router } from "express";
import { createNewNote, deleteNoteById, getNotesByUserId } from "./controllers";

const apiRouter = Router();

apiRouter.post("/notes/:userId", createNewNote);
apiRouter.get("/notes/:userId", getNotesByUserId);
apiRouter.delete("/notes/:noteId", deleteNoteById);

export default apiRouter;
