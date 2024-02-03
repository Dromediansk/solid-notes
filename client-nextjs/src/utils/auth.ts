import { prisma } from "@/prisma/db";
import { User } from "@prisma/client";
import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { AuthProfile } from "./types";

if (!process.env.GOOGLE_ID || !process.env.GOOGLE_SECRET) {
  throw new Error("Missing credentials for Google auth!");
}

const createUserFromGoogleProfile = async (profile: AuthProfile) => {
  const prismaUser = await prisma.user.upsert({
    where: {
      googleId: profile.sub,
      email: profile.email,
    },
    update: {},
    create: {
      googleId: profile.sub || "",
      firstName: profile.given_name || "",
      lastName: profile.last_name || "",
      email: profile.email || "",
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
  ],
  session: {
    maxAge: 86400000, // 1 day
  },
  callbacks: {
    async signIn({ profile }) {
      if (!profile) {
        return false;
      }
      try {
        await createUserFromGoogleProfile(profile as AuthProfile);
        return true;
      } catch (err) {
        console.log("Error signing in user: ", err);
        return false;
      }
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
