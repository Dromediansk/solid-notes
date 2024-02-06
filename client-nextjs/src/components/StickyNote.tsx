"use client";
import { deleteNoteInDb } from "@/services/notes";
import { Note } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Menu } from "@headlessui/react";
import OptionsIcon from "./icons/OptionsIcon";
import EditIcon from "./icons/EditIcon";
import DeleteIcon from "./icons/DeleteIcon";

type StickyNoteProps = {
  note: Note;
};

const StickyNote: FC<StickyNoteProps> = ({ note }) => {
  const router = useRouter();

  const handleDeleteNote = async () => {
    try {
      console.log("hi");
      await deleteNoteInDb(note.id);
      router.refresh();
    } catch (error) {
      console.log("Error deleting note ", error);
    }
  };

  return (
    <div className="border border-gray-200 gap-4 shadow-sm rounded z-10 flex flex-col justify-between group">
      <p
        title={note.text}
        className="max-w-sm text-center m-4 mb-0 line-clamp-3"
      >
        {note.text}
      </p>
      <footer className="m-2 h-5 flex justify-end">
        <Menu>
          <Menu.Button className="hidden group-hover:block">
            <OptionsIcon />
          </Menu.Button>
          <Menu.Items className="absolute flex flex-col p-2 bg-slate-100 rounded shadow-md">
            <Menu.Item>
              <span className="py-1 px-2 cursor-pointer flex gap-2 items-center">
                <EditIcon />
                <span>Update</span>
              </span>
            </Menu.Item>
            <Menu.Item>
              <span
                className="py-1 px-2 cursor-pointer text-red-500 flex gap-2 items-center"
                onClick={handleDeleteNote}
              >
                <DeleteIcon />
                <span>Delete</span>
              </span>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </footer>
    </div>
  );
};

export default StickyNote;
