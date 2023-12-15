export type Note = {
  id: string;
  text: string;
  createdAt: Date;
};

export type User = {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
};

export type NoteByDate = { [key: string]: Note[] };
