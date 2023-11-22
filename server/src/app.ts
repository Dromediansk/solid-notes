import express from "express";
import morgan from "morgan";
import apiRouter from "./routes/notes/router";
import { handleGeneralError, handleNotFoundError } from "./utils/error";

const app = express();

app.use(morgan("combined"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.use("/*", handleNotFoundError);
app.use(handleGeneralError);

export default app;
