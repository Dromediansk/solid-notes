"use client";
import { deleteNoteInDb } from "@/services/notes";
import { Note } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FC, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import OptionsIcon from "./icons/OptionsIcon";
import EditIcon from "./icons/EditIcon";
import DeleteIcon from "./icons/DeleteIcon";

type StickyNoteProps = {
  note: Note;
};

const menuItemClassName =
  "p-2 cursor-pointer flex gap-2 items-center transition-colors duration-300";

const StickyNote: FC<StickyNoteProps> = ({ note }) => {
  const router = useRouter();

  const handleDeleteNote = async () => {
    try {
      await deleteNoteInDb(note.id);
      router.refresh();
    } catch (error) {
      console.log("Error deleting note ", error);
    }
  };

  return (
    <div className="gap-4 shadow-md rounded z-10 flex flex-col justify-between group">
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
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute flex flex-col bg-slate-100 rounded shadow-md">
              <Menu.Item>
                {({ active }) => (
                  <span
                    className={`${menuItemClassName} ${
                      active ? "bg-gray-200" : ""
                    }`}
                  >
                    <EditIcon />
                    <span>Update</span>
                  </span>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <span
                    className={`${menuItemClassName} text-red-500 ${
                      active ? "bg-gray-200" : ""
                    }`}
                    onClick={handleDeleteNote}
                  >
                    <DeleteIcon />
                    <span>Delete</span>
                  </span>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </footer>
    </div>
  );
};

export default StickyNote;
