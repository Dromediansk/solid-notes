import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import apiRouter from "./routes/notes/router";
import { handleGeneralError, handleNotFoundError } from "./utils/error";
import helmet from "helmet";
import authRouter from "./routes/auth/router";
import { isAuthenticated } from "./services/passport";

if (!process.env.SESSION_SECRET) {
  throw new Error("Environment variable secret is missing!");
}

const app = express();

app.use(morgan("combined"));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(helmet());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/api", isAuthenticated, apiRouter);

app.get("/", (req, res) => {
  res.send(req.isAuthenticated() ? "Logged in" : "Not logged in");
});

app.use("/*", handleNotFoundError);
app.use(handleGeneralError);

export default app;
