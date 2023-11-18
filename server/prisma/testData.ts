import { Prisma } from "@prisma/client";
import { randomUUID } from "crypto";

export const testNotes: Prisma.NoteCreateInput[] = [
  { id: randomUUID(), text: "Testing note 1" },
  { id: randomUUID(), text: "Lorem ipsum how are you" },
  { id: randomUUID(), text: "Testing note 3" },
];
