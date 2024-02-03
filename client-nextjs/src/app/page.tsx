import { getServerSession } from "next-auth";
import { authOptions, loginIsRequiredServer } from "../utils/auth";

export default async function Home() {
  await loginIsRequiredServer();

  const session = await getServerSession(authOptions);

  return (
    <main>
      <h3>This is your email: {session?.user?.email}</h3>
    </main>
  );
}
