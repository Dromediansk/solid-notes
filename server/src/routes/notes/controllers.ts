import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
import { Prisma } from "@prisma/client";

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes: Prisma.NoteCreateInput[] = await prisma.note.findMany();
    res.status(200).json({ data: notes });
  } catch (error) {
    res.status(500).json({ message: "Unable to get notes" });
  }
};
