"use client";
import { createNoteInDb } from "@/services/notes";
import { DefaultUser } from "next-auth";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

type AddNewNoteFormProps = {
  user: DefaultUser;
};

const AddNewNoteForm: FC<AddNewNoteFormProps> = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleAddNote = async () => {
    try {
      setIsLoading(true);

      await createNoteInDb(inputValue, user.id);
      setInputValue("");
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="inline-flex justify-center items-center border-2 border-gray-200 shadow-md p-4 gap-2 flex-col rounded"
      action={handleAddNote}
    >
      <textarea
        className="w-96 h-24 bg-gray-50 text-gray-900 text-sm rounded-md p-2 resize focus:outline-cyan-500"
        placeholder="Write a note"
        name="body"
        value={inputValue}
        onChange={(event) => setInputValue(event.currentTarget.value)}
        required
      />
      <button
        type="submit"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2 w-20 h-10"
        disabled={isLoading}
      >
        Add
      </button>
    </form>
  );
};

export default AddNewNoteForm;
