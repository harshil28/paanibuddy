import { create } from "zustand";
import type { CompanionState } from "../types/companion";

interface CompanionStore {
  state: CompanionState;
  message: string;

  setState: (state: CompanionState) => void;
  setMessage: (message: string) => void;
}

export const useCompanionStore = create<CompanionStore>((set) => ({
<<<<<<< HEAD
  state: "leaving",
=======
  state: "hidden",
>>>>>>> 9a7989679031228215f33fa8923a2d5acd3578f1

  message: "💧 Time to drink some water!",

  setState: (state) => set({ state }),

  setMessage: (message) => set({ message }),
}));