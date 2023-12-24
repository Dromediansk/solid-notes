import { Response, Request } from "express";
import { prisma } from "../../prisma/db";
import { Note } from "@prisma/client";

type GetNotesRequestQuery = {
  userId: string;
};

type BaseNote = Omit<Note, "userId">;

type NoteIdsRequestQuery = {
  noteId: string;
};

export const getNotes = async (
  req: Request<never, unknown, never, GetNotesRequestQuery>,
  res: Response
) => {
  try {
    const { user } = req;

    if (!user) {
      throw new Error("You must be logged in!");
    }

    const notes: Note[] = await prisma.note.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" },
    });
    res.status(200).json({ data: notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to get notes" });
  }
};

export const upsertNote = async (
  req: Request<never, unknown, BaseNote>,
  res: Response
) => {
  try {
    const { user, body } = req;

    if (!user) {
      throw new Error("You must be logged in!");
    }

    const newNote: Note = { ...body, userId: user.id };

    const note: Note = await prisma.note.upsert({
      where: { id: body.id || "" },
      update: newNote,
      create: newNote,
    });
    res.status(201).json({ data: note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to create note" });
  }
};

export const deleteNote = async (
  req: Request<never, unknown, never, NoteIdsRequestQuery>,
  res: Response
) => {
  try {
    const { noteId } = req.query;
    const { user } = req;

    if (!user) {
      throw new Error("You must be logged in!");
    }

    await prisma.note.delete({
      where: { id: noteId },
    });
    res.status(201).json({ message: "Note deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to delete notes" });
  }
};
