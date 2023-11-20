import { Note, User } from "@prisma/client";
import { randomUUID } from "crypto";

export const testUsers: User[] = [
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

export const testNotes: Note[] = [
  { id: randomUUID(), userId: testUsers[0].id, text: "Testing note 1" },
  {
    id: randomUUID(),
    userId: testUsers[0].id,
    text: "Lorem ipsum how are you",
  },
  { id: randomUUID(), userId: testUsers[1].id, text: "Testing note 3" },
];
