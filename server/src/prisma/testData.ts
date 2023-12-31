import { Note, User } from "@prisma/client";

export const testUsers: User[] = [
  {
    id: "1",
    firstName: "Michael",
    lastName: "Hatay",
    email: "test@test.com",
    googleId: "123",
  },
  {
    id: "2",
    firstName: "Dohal",
    lastName: "Mitas",
    email: "test2@test.com",
    googleId: "223",
  },
];

export const testNotes: Note[] = [
  {
    id: "1",
    userId: testUsers[0].id,
    text: "Testing note 1",
    createdAt: new Date(),
  },
  {
    id: "2",
    userId: testUsers[0].id,
    text: "Lorem ipsum how are you",
    createdAt: new Date(),
  },
  {
    id: "3",
    userId: testUsers[1].id,
    text: "Testing note 3",
    createdAt: new Date(),
  },
];
