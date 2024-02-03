"use client";
import { deleteNoteInDb } from "@/services/notes";
import { Note } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FC } from "react";

type StickyNoteProps = {
  note: Note;
};

const StickyNote: FC<StickyNoteProps> = ({ note }) => {
  const router = useRouter();

  const handleDeleteNote = async () => {
    try {
      await deleteNoteInDb(note.id);
      router.refresh();
    } catch (error) {
      console.log("Error deleting note ", error);
    }
  };
  return (
    <li className="border border-gray-200 flex gap-4 relative shadow-sm rounded">
      <div className="flex flex-col px-2">
        <div className="w-44 text-center p-4">
          <span>{note.text}</span>
        </div>
      </div>
      <svg
        className="h-5 w-5 fill-gray-100 text-gray-500 absolute -right-2 -top-2 cursor-pointer hover:fill-red-300"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        onClick={handleDeleteNote}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    </li>
  );
};

export default StickyNote;
