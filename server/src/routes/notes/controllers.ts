import { Request, Response } from "express";

export const getAllNotes = (req: Request, res: Response) => {
  res.send("Hello, this is your notes app!");
};
