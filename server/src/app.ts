import express from "express";
import apiRouter from "./routes/notes/router";
import { handleGeneralError, handleNotFoundError } from "./utils/error";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.get("/*", handleNotFoundError);
app.use(handleGeneralError);

export default app;
