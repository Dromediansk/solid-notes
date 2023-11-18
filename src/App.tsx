import { createSignal, type Component, For } from "solid-js";
import { Note } from "./types";
import AddNoteForm from "./components/AddNoteForm";

const App: Component = () => {
  const [notes, setNotes] = createSignal<Note[]>([]);

  const removeNote = (noteId: string) => {
    const newNotes = [...notes()];
    const noteIndex = newNotes.findIndex((note) => note.id === noteId);
    newNotes.splice(noteIndex, 1);
    setNotes(newNotes);
  };

  return (
    <main class="container p-4 mx-auto">
      <AddNoteForm setNotes={setNotes} />

      <ul class="flex gap-2">
        <For each={notes()}>
          {(note) => (
            <li class="border border-gray-200 p-4 flex gap-4">
              <span>{note.text}</span>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke-width={1.5}
                stroke="currentColor"
                class="w-3 h-3 cursor-pointer"
                onClick={() => removeNote(note.id)}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </li>
          )}
        </For>
      </ul>
    </main>
  );
};

export default App;
