import { Router } from "express";
import { createNote, deleteNotes, getNotes } from "./controllers";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { AUTH_OPTIONS, verifyCallback } from "../../services/passport";

const apiRouter = Router();

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

apiRouter.post("/notes", createNote);
apiRouter.get("/notes", getNotes);
apiRouter.delete("/notes", deleteNotes);

export default apiRouter;
