import { create } from "zustand";
import SettingsService from "../services/SettingsService";
import { DEFAULT_SETTINGS, type Settings } from "../types/settings";

interface SettingsState {
    settings: Settings;

    load: () => Promise<void>;
    save: (settings: Settings) => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
    settings: DEFAULT_SETTINGS,

    load: async () => {
        const settings = await SettingsService.load();
        set({ settings });
    },

    save: async (settings: Settings) => {
        await SettingsService.save(settings);
        set({ settings });
    },
}));