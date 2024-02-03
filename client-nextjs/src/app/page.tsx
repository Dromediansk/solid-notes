import { getServerSession } from "next-auth";
import { authOptions, loginIsRequiredServer } from "../utils/auth";
import { Note, User } from "@prisma/client";
import { prisma } from "@/prisma/db";
import { redirect } from "next/navigation";
import AddNewNoteForm from "@/components/AddNewNoteForm";
import NotesList from "@/components/NotesList";

const fetchNotesByUserId = async (userId: User["id"]): Promise<Note[]> => {
  "use server";
  try {
    const notes: Note[] = await prisma.note.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: "asc" },
    });
    return notes;
  } catch (error) {
    throw new Error(`Error fetching notes: ${error}`);
  }
};

export default async function Home() {
  await loginIsRequiredServer();

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return redirect("/login");
  }
  const notes = await fetchNotesByUserId(session.user.id);

  return (
    <main>
      <div className="text-center">
        <AddNewNoteForm user={session.user} />
        <NotesList notes={notes} />
      </div>
    </main>
  );
}
