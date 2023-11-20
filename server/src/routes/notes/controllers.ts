import { Response } from "express";
import { prisma } from "../../prisma/db";
import { Note, Prisma } from "@prisma/client";
import { RequestWithBody, RequestWithQuery } from "../../utils/types";

type NotesByUserIdParam = {
  userId: string;
};

type NoteByNoteIdParam = {
  noteId: string;
};

type BaseNote = Omit<Note, "userId">;

export const getNotesByUserId = async (
  req: RequestWithQuery<NotesByUserIdParam>,
  res: Response
) => {
  try {
    const { params } = req;
    const notes: Note[] = await prisma.note.findMany({
      where: { userId: { equals: params.userId } },
    });
    res.status(200).json({ data: notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to get notes" });
  }
};

export const createNewNote = async (
  req: RequestWithBody<NotesByUserIdParam, BaseNote>,
  res: Response
) => {
  try {
    const { params } = req;
    const newNote: Note = { ...req.body, userId: params.userId };
    const note: Prisma.NoteCreateInput = await prisma.note.create({
      data: newNote,
    });
    res.status(201).json({ data: note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to create note" });
  }
};

export const deleteNoteById = async (
  req: RequestWithQuery<NoteByNoteIdParam>,
  res: Response
) => {
  try {
    const { noteId } = req.params;
    await prisma.note.delete({ where: { id: noteId } });
    res.status(201).json({ message: "Note deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to delete note" });
  }
};
