import { fetchAuthStatus } from "@/services/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const auth = await fetchAuthStatus();

  if (!auth.user) {
    redirect("/login");
  }

  return <main>Hello</main>;
}
