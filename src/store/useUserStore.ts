import { create } from "zustand";
import type { UserState, UserInfoResponse } from "@/types/user";

const useUserStore = create<
  Omit<UserState, "setUser"> & {
    setUser: (user: UserInfoResponse["data"] | null) => void;
  }
>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useUserStore;
