"use client";

import { Note } from "@prisma/client";
import { FC } from "react";
import StickyNote from ".";

type StickyNotesListProps = {
  notes: Note[];
};

const StickyNotesList: FC<StickyNotesListProps> = ({ notes }) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 justify-center gap-6 my-4">
      {notes.map((note) => (
        <StickyNote key={note.id} note={note} />
      ))}
    </div>
  );
};

export default StickyNotesList;
