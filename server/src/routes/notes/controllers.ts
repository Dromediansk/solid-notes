import { Request, Response } from "express";
import { prisma } from "../../prisma/db";
import { Note, Prisma } from "@prisma/client";

type UserIdQuery = {
  userId: string;
};

type UserIdNoteIdQuery = UserIdQuery & {
  noteId: string;
};

type BaseNote = Omit<Note, "userId">;

export const getNotes = async (
  req: Request<never, unknown, never, UserIdQuery>,
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
  req: Request<never, unknown, BaseNote, UserIdQuery>,
  res: Response
) => {
  try {
    const { query } = req;
    const newNote: Note = { ...req.body, userId: query.userId };

    const note: Prisma.NoteCreateInput = await prisma.note.create({
      data: newNote,
    });
    res.status(201).json({ data: note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to create note" });
  }
};

export const deleteNotes = async (
  req: Request<never, unknown, never, UserIdNoteIdQuery>,
  res: Response
) => {
  try {
    const { userId, noteId } = req.query;

    await prisma.note.delete({ where: { id: noteId, userId: userId } });
    res.status(201).json({ message: "Note deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to delete note" });
  }
};
