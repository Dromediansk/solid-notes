import { Prisma } from "@prisma/client";
import { randomUUID } from "crypto";

export const testUsers: Prisma.UserCreateInput[] = [
  {
    id: randomUUID(),
    firstName: "Michael",
    lastName: "Hatay",
    email: "test@test.com",
  },
  {
    id: randomUUID(),
    firstName: "Dohal",
    lastName: "Mitas",
    email: "test2@test.com",
  },
];

export const testNotes: Prisma.NoteCreateInput[] = [
  { userId: testUsers[0].id!, text: "Testing note 1" },
  { userId: testUsers[0].id!, text: "Lorem ipsum how are you" },
  { userId: testUsers[1].id!, text: "Testing note 3" },
];
