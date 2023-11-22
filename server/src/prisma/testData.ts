import { Note, User } from "@prisma/client";

export const testUsers: User[] = [
  {
    id: "1",
    firstName: "Michael",
    lastName: "Hatay",
    email: "test@test.com",
  },
  {
    id: "2",
    firstName: "Dohal",
    lastName: "Mitas",
    email: "test2@test.com",
  },
];

export const testNotes: Note[] = [
  { id: "1", userId: testUsers[0].id, text: "Testing note 1" },
  {
    id: "2",
    userId: testUsers[0].id,
    text: "Lorem ipsum how are you",
  },
  { id: "3", userId: testUsers[1].id, text: "Testing note 3" },
];
