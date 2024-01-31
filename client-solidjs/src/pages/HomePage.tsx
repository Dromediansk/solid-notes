import { For, createEffect } from "solid-js";
import { Note, NoteByDate } from "../types";
import AddNoteForm from "../components/AddNoteForm";
import { fetchNotes } from "../services/note";
import dayjs from "dayjs";
import NoteGroup from "../components/NoteGroup";
import { groupedNotes, setGroupedNotes } from "../stores/notes";

const groupNotesByDate = (notes: Note[]) => {
  const groupedNotes: NoteByDate = {};

  notes.forEach((note) => {
    const date = dayjs(note.createdAt).format("YYYY-MM-DD");
    if (!groupedNotes[date]) {
      groupedNotes[date] = [];
    }
    groupedNotes[date].push(note);
  });

  return groupedNotes;
};

const HomePage = () => {
  createEffect(async () => {
    const response = await fetchNotes();
    const groupedNotes = groupNotesByDate(response.data);
    setGroupedNotes(groupedNotes);
  });

  return (
    <main class="container p-4 mx-auto">
      <AddNoteForm />

      <ul class="flex flex-wrap justify-center gap-8 py-6">
        <For each={Object.entries(groupedNotes())}>
          {([date, notes]) => <NoteGroup date={date} notes={notes} />}
        </For>
      </ul>
    </main>
  );
};

export default HomePage;
