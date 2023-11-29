import { Component, JSX, Setter, createSignal } from "solid-js";
import { Note } from "../types";
import { upsertNote } from "../services/note";

type AddNoteFormProps = {
  setNotes: Setter<Note[]>;
};

const AddNoteForm: Component<AddNoteFormProps> = (props) => {
  const { setNotes } = props;
  const [inputValue, setInputValue] = createSignal("");

  const handleChangeInput: JSX.EventHandler<HTMLTextAreaElement, Event> = (
    event
  ) => {
    setInputValue(event.currentTarget.value);
  };

  const addNote = async (event: Event) => {
    event.preventDefault();

    const newNote = { text: inputValue() };
    const response = await upsertNote(newNote);

    setNotes((prevState) => [...prevState, response.data]);
    setInputValue("");
  };

  return (
    <div class="text-center">
      <form
        class="inline-flex justify-center items-center border-2 border-gray-200 shadow-md p-4 gap-2 flex-col rounded"
        onSubmit={addNote}
      >
        <textarea
          class="w-96 h-24 bg-gray-50 text-gray-900 text-sm rounded-md p-2 resize focus:outline-cyan-500"
          placeholder="Write a note"
          onChange={handleChangeInput}
          value={inputValue()}
          required
        />
        <button
          type="submit"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2 w-20 h-10"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddNoteForm;
