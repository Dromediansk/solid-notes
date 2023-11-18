import { Prisma } from "@prisma/client";
import { randomUUID } from "crypto";

export const testNotes: Prisma.NoteCreateInput[] = [
  { userId: randomUUID(), text: "Testing note 1" },
  { userId: randomUUID(), text: "Lorem ipsum how are you" },
  { userId: randomUUID(), text: "Testing note 3" },
];
