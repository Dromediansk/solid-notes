import { createSignal } from "solid-js";
import { Note, NoteByDate } from "../types";
import dayjs from "dayjs";

export const [groupedNotes, setGroupedNotes] = createSignal<NoteByDate>({});

export const addNote = (note: Note) => {
  const date = dayjs(note.createdAt).format("YYYY-MM-DD");

  setGroupedNotes((groupedNotes) => ({
    ...groupedNotes,
    [date]: [...(groupedNotes[date] || []), note],
  }));
};

export const removeNote = (date: Date, id: string) => {
  const formattedDate = dayjs(date).format("YYYY-MM-DD");
  const notes = groupedNotes()[formattedDate].filter((note) => note.id !== id);

  setGroupedNotes((groupedNotes) => ({
    ...groupedNotes,
    [formattedDate]: notes,
  }));
};
