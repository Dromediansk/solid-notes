import { createSignal, type Component, For, createEffect } from "solid-js";
import { Note } from "../types";
import AddNoteForm from "../components/AddNoteForm";
import { deleteNote, fetchNotes } from "../services/note";
import StickyNote from "../components/StickyNote";

const HomePage: Component = () => {
  const [notes, setNotes] = createSignal<Note[]>([]);

  createEffect(async () => {
    const response = await fetchNotes();
    setNotes(response.data);
  });

  const handleRemoveNote = async (noteId: string) => {
    await deleteNote(noteId);

    const newNotes = [...notes()];
    const noteIndex = newNotes.findIndex((note) => note.id === noteId);
    newNotes.splice(noteIndex, 1);
    setNotes(newNotes);
  };

  return (
    <main class="container p-4 mx-auto">
      <AddNoteForm setNotes={setNotes} />

      <ul class="flex flex-wrap justify-center gap-8 py-6">
        <For each={notes()}>
          {(note) => <StickyNote note={note} onRemove={handleRemoveNote} />}
        </For>
      </ul>
    </main>
  );
};

export default HomePage;
