import { Component } from "solid-js";
import { Note } from "../types";
import StickyNote from "./StickyNote";
import dayjs from "dayjs";

type NoteGroupProps = {
  date: string;
  notes: Note[];
};

const NoteGroup: Component<NoteGroupProps> = (props) => {
  const { date, notes } = props;

  return (
    <div class="p-2 border rounded shadow-sm">
      <h2 class="text-center p-2">{dayjs(date).format("DD. MMM YYYY")}</h2>
      <ul class="flex gap-2 flex-wrap max-w-md">
        {notes.map((note) => (
          <StickyNote note={note} />
        ))}
      </ul>
    </div>
  );
};

export default NoteGroup;
