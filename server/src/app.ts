import express from "express";
import apiRouter from "./routes/notes/router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("hello");
app.use("/api", apiRouter);

export default app;
