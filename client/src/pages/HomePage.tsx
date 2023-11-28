import { createSignal, type Component, For, createEffect } from "solid-js";
import { Note } from "../types";
import AddNoteForm from "../components/AddNoteForm";
import { deleteNote, fetchNotes } from "../services/note";

const HomePage: Component = () => {
  const [notes, setNotes] = createSignal<Note[]>([]);

  createEffect(async () => {
    const response = await fetchNotes();
    setNotes(response.data);
  });

  const removeNote = async (noteId: string) => {
    await deleteNote(noteId);

    const newNotes = [...notes()];
    const noteIndex = newNotes.findIndex((note) => note.id === noteId);
    newNotes.splice(noteIndex, 1);
    setNotes(newNotes);
  };

  return (
    <main class="container p-4 mx-auto">
      <AddNoteForm setNotes={setNotes} />

      <ul class="flex gap-4">
        <For each={notes()}>
          {(note) => (
            <li class="border border-gray-200 p-4 flex gap-4 relative shadow-xl">
              <span class="w-44 text-center">{note.text}</span>
              <svg
                class="h-5 w-5 fill-gray-100 text-gray-500 absolute -right-2 -top-2 cursor-pointer hover:fill-red-300"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                onClick={() => removeNote(note.id)}
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </li>
          )}
        </For>
      </ul>
    </main>
  );
};

export default HomePage;
