"use server";

import { prisma } from "@/prisma/db";
import { CreateNoteBody } from "@/utils/types/common";
import { DefaultUser } from "next-auth";

export const createNoteInDb = async (
  inputValue: string,
  userId: DefaultUser["id"]
) => {
  try {
    const newNote: CreateNoteBody = {
      text: inputValue,
      authorId: userId,
    };

    await prisma.note.create({
      data: {
        ...newNote,
      },
    });
  } catch (error) {
    throw new Error(`Error creating note in db! ${error}`);
  }
};

export const deleteNoteInDb = async (noteId: string) => {
  try {
    await prisma.note.delete({ where: { id: noteId } });
  } catch (error) {
    throw new Error(`Error deleting note in db! ${error}`);
  }
};
