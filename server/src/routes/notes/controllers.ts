import { Response } from "express";
import { prisma } from "../../prisma/db";
import { Prisma } from "@prisma/client";
import { RequestWithQuery } from "../../utils/types";

type NotesByUserIdQuery = {
  userId: string;
};

export const getNotesByUserId = async (
  req: RequestWithQuery<NotesByUserIdQuery>,
  res: Response
) => {
  try {
    const { params } = req;
    const notes: Prisma.NoteCreateInput[] = await prisma.note.findMany({
      where: { userId: { equals: params.userId } },
    });
    res.status(200).json({ data: notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to get notes" });
  }
};
