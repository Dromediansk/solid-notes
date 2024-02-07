"use server";

import { prisma } from "@/prisma/db";
import { CreateNoteBody } from "@/utils/types/common";
import { DefaultUser } from "next-auth";

export const createNoteInDb = async (
  inputValue: string,
  userId: DefaultUser["id"],
  orderNumber: number
) => {
  try {
    const newNote: CreateNoteBody = {
      text: inputValue,
      authorId: userId,
      orderNumber,
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

export const updateNoteInDb = async (noteId: string, inputValue: string) => {
  try {
    await prisma.note.update({
      where: { id: noteId },
      data: {
        text: inputValue,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    throw new Error(`Error updating note in db! ${error}`);
  }
};

export const deleteNoteInDb = async (noteId: string) => {
  try {
    await prisma.note.delete({ where: { id: noteId } });
  } catch (error) {
    throw new Error(`Error deleting note in db! ${error}`);
  }
};
