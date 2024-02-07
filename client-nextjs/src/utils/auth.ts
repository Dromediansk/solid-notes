import { prisma } from "@/prisma/db";
import { NextAuthOptions, Session, User, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { AuthProfile } from "./types/common";

if (!process.env.GOOGLE_ID || !process.env.GOOGLE_SECRET) {
  throw new Error("Missing environment variables for Google auth!");
}

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
  throw new Error("Missing environment variables for GitHub auth!");
}

const createUserFromOAuthProvider = async (
  profile: AuthProfile,
  user: User
) => {
  const userId = profile.sub || user.id;
  const prismaUser = await prisma.user.upsert({
    where: {
      id: userId,
      email: profile.email,
    },
    update: {},
    create: {
      id: userId,
      firstName: profile.given_name || "",
      lastName: profile.last_name || "",
      email: profile.email || user.email || "",
    },
  });
  return prismaUser;
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  session: {
    maxAge: 86400000, // 1 day
  },
  callbacks: {
    async signIn({ profile, user }) {
      if (!profile) {
        return false;
      }
      try {
        await createUserFromOAuthProvider(profile as AuthProfile, user);
        return true;
      } catch (err) {
        console.log("Error signing in user: ", err);
        return false;
      }
    },
    async session({ session, token }) {
      return { user: { ...session.user, id: token.sub } } as Session;
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
