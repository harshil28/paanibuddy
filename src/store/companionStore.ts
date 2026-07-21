import { create } from "zustand";
import type { CompanionState } from "../types/companion";

interface CompanionStore {
  state: CompanionState;
  message: string;

  setState: (state: CompanionState) => void;
  setMessage: (message: string) => void;
}

export const useCompanionStore = create<CompanionStore>((set) => ({
  state: "hidden",

  message: "💧 Time to drink some water!",

  setState: (state) => set({ state }),

  setMessage: (message) => set({ message }),
}));