"use client";
import { createNoteInDb } from "@/services/notes";
import { DefaultUser } from "next-auth";
import { useRouter } from "next/navigation";
import { FC, SyntheticEvent, useState } from "react";

type AddNewNoteFormProps = {
  user: DefaultUser;
};

const AddNewNoteForm: FC<AddNewNoteFormProps> = ({ user }) => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleAddNote = async (event: SyntheticEvent) => {
    try {
      event.preventDefault();
      await createNoteInDb(inputValue, user.id, 1);
      setInputValue("");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="inline-flex justify-center items-center border-2 border-gray-200 shadow-sm"
      onSubmit={handleAddNote}
    >
      <input
        className="w-96 h-10 bg-gray-50 text-gray-900 text-sm rounded p-2 resize focus:outline-emerald-500"
        placeholder="What did you learn today?"
        name="body"
        value={inputValue}
        onChange={(event) => setInputValue(event.currentTarget.value)}
        required
      />
    </form>
  );
};

export default AddNewNoteForm;
