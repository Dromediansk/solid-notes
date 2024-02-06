import { FC, Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import StickyNoteFooter from "./StickyNoteFooter";
import { Note } from "@prisma/client";
import { updateNoteInDb } from "@/services/notes";
import { useRouter } from "next/navigation";

type StickyNoteDialogProps = {
  note: Note;
  setDialogOpen: (state: boolean) => void;
};

const StickyNoteDialog: FC<StickyNoteDialogProps> = ({
  setDialogOpen,
  note,
}) => {
  const [inputValue, setInputValue] = useState(note.text);

  const router = useRouter();
  const inputRef = useRef(null);

  const handleClose = async () => {
    try {
      await updateNoteInDb(note.id, inputValue);
      setDialogOpen(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Transition.Root show as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={inputRef}
        onClose={handleClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    {/* <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Title
                    </Dialog.Title> */}
                    <div className="mt-2 h-fit">
                      <textarea
                        className="text-sm text-gray-500 w-full h-60 p-2"
                        value={inputValue}
                        onChange={(event) =>
                          setInputValue(event.currentTarget.value)
                        }
                        ref={inputRef}
                      />
                    </div>
                  </div>
                </div>

                <StickyNoteFooter
                  noteId={note.id}
                  setDialogOpen={setDialogOpen}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default StickyNoteDialog;
