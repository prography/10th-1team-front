import { create } from "zustand";
import type { UserState, UserInfo } from "@/types/user";

const useUserStore = create<
  Omit<UserState, "setUser"> & {
    setUser: (user: UserInfo | null) => void;
    clearUser: () => void;
  }
>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
