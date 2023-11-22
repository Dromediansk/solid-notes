import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
import { Note } from "@prisma/client";

type UserIdRequestQuery = {
  userId: string;
};

type NoteIdsRequestQuery = UserIdRequestQuery & {
  noteIds: string[];
};

type BaseNote = Omit<Note, "userId">;

export const getNotes = async (
  req: Request<never, unknown, never, UserIdRequestQuery>,
  res: Response
) => {
  try {
    const { query } = req;
    const notes: Note[] = await prisma.note.findMany({
      where: { userId: { equals: query.userId } },
    });
    res.status(200).json({ data: notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to get notes" });
  }
};

export const createNote = async (
  req: Request<never, unknown, BaseNote, UserIdRequestQuery>,
  res: Response
) => {
  try {
    const { query } = req;
    const newNote: Note = { ...req.body, userId: query.userId };

    const note: Note = await prisma.note.create({
      data: newNote,
    });
    res.status(201).json({ data: note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to create note" });
  }
};

export const deleteNotes = async (
  req: Request<never, unknown, never, NoteIdsRequestQuery>,
  res: Response
) => {
  try {
    const { userId, noteIds } = req.query;

    await prisma.note.deleteMany({
      where: { userId, id: { in: noteIds.map((id) => id) } },
    });
    res.status(201).json({ message: "Notes deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to delete notes" });
  }
};
