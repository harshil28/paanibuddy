import { load } from "@tauri-apps/plugin-store";
import { DEFAULT_SETTINGS, type Settings } from "../types/settings";

const STORE_FILE = "settings.json";
const SETTINGS_KEY = "settings";

class SettingsService {
    private readonly storePromise = load(STORE_FILE);

    private async getStore() {
        return this.storePromise;
    }

    async load(): Promise<Settings> {
        const store = await this.getStore();

        const settings = await store.get<Settings>(SETTINGS_KEY);

        if (settings) {
            return settings;
        }

        await this.save(DEFAULT_SETTINGS);

        return DEFAULT_SETTINGS;
    }

    async save(settings: Settings): Promise<void> {
        const store = await this.getStore();

        await store.set(SETTINGS_KEY, settings);
        await store.save();
    }

    async reset(): Promise<Settings> {
        await this.save(DEFAULT_SETTINGS);
        return DEFAULT_SETTINGS;
    }
}

export default new SettingsService();