import { User } from "@/utils/types";
import { create } from "zustand";

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: () => set((state) => ({ user: state.user })),
}));
