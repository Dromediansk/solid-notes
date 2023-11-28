import { Component } from "solid-js";
import { Note } from "../types";
import dayjs from "dayjs";

type StickyNoteProps = {
  note: Note;
  onRemove: (noteId: string) => void;
};

const StickyNote: Component<StickyNoteProps> = (props) => {
  const { note, onRemove } = props;

  const time = dayjs(note.createdAt).format("DD. MMM YYYY: hh:mm");

  return (
    <li class="border border-gray-200 flex gap-4 relative shadow-xl">
      <div class="flex flex-col px-2">
        <div class="w-44 text-center p-4">{note.text}</div>
        <footer class="text-sm text-gray-400 text-right">{time}</footer>
      </div>
      <svg
        class="h-5 w-5 fill-gray-100 text-gray-500 absolute -right-2 -top-2 cursor-pointer hover:fill-red-300"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        onClick={() => onRemove(note.id)}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    </li>
  );
};

export default StickyNote;
