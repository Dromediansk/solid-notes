"use client";

import { Note } from "@prisma/client";
import { FC } from "react";
import StickyNote from "./StickyNote";

type NotesListProps = {
  notes: Note[];
};

const NotesList: FC<NotesListProps> = ({ notes }) => {
  return (
    <div className="p-5">
      <ul className="flex gap-2 flex-wrap justify-center">
        {notes.map((note) => (
          <StickyNote key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
