import { Profile } from "next-auth";

export type Note = {
  id: string;
  text: string;
  createdAt: Date;
  authorId: string;
};

export type CreateNoteBody = Pick<Note, "authorId" | "text">;

export type User = {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
};

export type NoteByDate = { [key: string]: Note[] };

export type AuthProfile = Profile & {
  given_name: string;
  last_name: string;
};
