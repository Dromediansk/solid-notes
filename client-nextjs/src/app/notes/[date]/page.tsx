import NotesList from "@/components/NotesList";
import { fetchNotesByDate } from "@/services/notes";
import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import { FC } from "react";

type PageProps = {
  params: { date: string };
};

const Page: FC<PageProps> = async ({ params }) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("Session not available!");
  }
  const notes = await fetchNotesByDate(session.user?.id, params.date);

  return (
    <div>
      <NotesList notes={notes} />
    </div>
  );
};

export default Page;
