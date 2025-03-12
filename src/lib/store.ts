import { Swar } from "@/schema/sur";
import { create } from "zustand";

type State = {
  swarArray: string[][];
  currentPage: number;
};

type Actions = {
  setSwarArray: (swarArray: string[][]) => void;
  setCurrentPage: (currentPage: number) => void;
  resetPage: () => void;
};

export const useStore = create<State & Actions>((set) => ({
  swarArray: [],
  currentPage: 0,
  setSwarArray(swarArray) {
    set({ swarArray });
  },
  setCurrentPage(currentPage) {
    set({ currentPage });
  },
  resetPage() {
    set({ currentPage: 0 });
  },
}));
