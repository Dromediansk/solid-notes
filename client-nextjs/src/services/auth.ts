import { User } from "@/utils/types";
import { cookies } from "next/headers";

type AuthStatusResponse = {
  user: User | null;
};

export const fetchAuthStatus = async (): Promise<AuthStatusResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/auth/status`,
      { headers: { Cookie: cookies().toString() } }
    );
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching auth status: ", error);
    return { user: null };
  }
};
