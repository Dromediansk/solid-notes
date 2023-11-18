import { Component, JSX, Setter, createSignal, createUniqueId } from "solid-js";
import { Note } from "../types";

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

  const addNote = (event: Event) => {
    event.preventDefault();

    setNotes((prevState) => [
      ...prevState,
      { id: createUniqueId(), text: inputValue() },
    ]);
    setInputValue("");
  };

  return (
    <form
      class="flex justify-center items-center gap-2 flex-col"
      onSubmit={addNote}
    >
      <textarea
        class="w-96 h-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2 resize"
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
  );
};

export default AddNoteForm;
