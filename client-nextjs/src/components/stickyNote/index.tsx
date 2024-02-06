"use client";
import { Note } from "@prisma/client";
import { FC, useState } from "react";
import StickyNoteFooter from "./StickyNoteFooter";
import StickyNoteDialog from "./StickyNoteDialog";

type StickyNoteProps = {
  note: Note;
};

const StickyNote: FC<StickyNoteProps> = ({ note }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div className="gap-4 shadow-md rounded flex flex-col justify-between group">
        <p
          title={note.text}
          className="max-w-sm text-center m-4 mb-0 line-clamp-3"
          onClick={() => setDialogOpen(true)}
        >
          {note.text}
        </p>
        <StickyNoteFooter noteId={note.id} setDialogOpen={setDialogOpen} />
      </div>
      <StickyNoteDialog
        note={note}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </>
  );
};

export default StickyNote;
