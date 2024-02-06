"use client";

import { Note } from "@prisma/client";
import { FC } from "react";
import StickyNote from "./stickyNote";

type NotesListProps = {
  notes: Note[];
};

const NotesList: FC<NotesListProps> = ({ notes }) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 my-4">
      {notes.map((note) => (
        <StickyNote key={note.id} note={note} />
      ))}
    </div>
  );
};

export default NotesList;
