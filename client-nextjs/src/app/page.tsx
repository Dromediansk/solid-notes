import { getServerSession } from "next-auth";
import { authOptions, loginIsRequiredServer } from "../utils/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  await loginIsRequiredServer();

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return redirect("/login");
  }

  return (
    <main className="mx-auto max-w-screen-lg">
      <div className="text-center my-2 mx-4"></div>
    </main>
  );
}
