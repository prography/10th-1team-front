import { create } from "zustand";
import type { UserState, UserInfo } from "@/types/user";

const useUserStore = create<
  Omit<UserState, "setUser"> & {
    setUser: (user: UserInfo | null) => void;
  }
>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useUserStore;
