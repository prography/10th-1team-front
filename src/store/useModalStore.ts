import { create } from "zustand";

type ModalType =
  | "login"
  | "share"
  | "toast"
  | "platformVote"
  | "placeSave"
  | "levelUp"
  | "confirm"
  | "groupSave"
  | "createGroup"
  | null;

interface ModalState {
  type: ModalType;
  props?: unknown;
  openModal: (type: ModalType, props?: unknown) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  type: null,
  props: undefined,
  openModal: (type, props) => set({ type, props }),
  closeModal: () => set({ type: null, props: undefined }),
}));
