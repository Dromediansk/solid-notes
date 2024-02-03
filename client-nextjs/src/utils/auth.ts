import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  session: {
    maxAge: 86400000, // 1 day
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("account", account);
      return true;
    },
  },
};

export async function loginIsRequiredServer() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }
}

export async function useAuthSession() {
  return await getServerSession(authOptions);
}

export function loginIsRequiredClient() {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const session = useSession();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    if (!session) router.push("/login");
  }
}

export async function isLoggedIn() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return false;
  }
  return true;
}
