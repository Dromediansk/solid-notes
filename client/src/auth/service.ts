import { User } from "../types";

type AuthStatusResponse = {
  user: User | null;
};

export const fetchAuthStatus = async (): Promise<AuthStatusResponse> => {
  try {
    const response = await fetch("http://localhost:8000/auth/status", {
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching auth status: ", error);
  }
};
