"use client";

import { Note } from "@prisma/client";
import { FC } from "react";
import StickyNote from ".";

type StickyNotesListProps = {
  notes: Note[];
};

const StickyNotesList: FC<StickyNotesListProps> = ({ notes }) => {
  if (notes.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Oops! Your notes seem to be on vacation. <br /> Time to break the
        silence with a new note!
      </p>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 justify-center gap-6 my-4">
      {notes.map((note) => (
        <StickyNote key={note.id} note={note} />
      ))}
    </div>
  );
};

export default StickyNotesList;
