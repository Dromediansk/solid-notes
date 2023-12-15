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

export const removeNote = (date: string, id: string) => {
  const notes = groupedNotes()[date].filter((note) => note.id !== id);
  
  setGroupedNotes((groupedNotes) => ({ ...groupedNotes, [date]: notes }));
};
