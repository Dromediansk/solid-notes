import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import apiRouter from "./routes/notes/router";
import { handleGeneralError, handleNotFoundError } from "./utils/error";
import helmet from "helmet";
import authRouter from "./routes/auth/router";
import { isAuthenticated } from "./services/passport";
import { session } from "./services/redis";

const app = express();

app.use(morgan("combined"));

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.use(helmet());

app.use(session);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/api", isAuthenticated, apiRouter);

app.use("/*", handleNotFoundError);
app.use(handleGeneralError);

export default app;
