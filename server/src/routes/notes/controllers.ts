import { Request, Response } from "express";
import { prisma } from "../../prisma/db";

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes = await prisma.note.findMany();
    res.status(200).json({ data: notes });
  } catch (error) {
    res.status(500).json({ message: "Unable to get notes" });
  }
};
