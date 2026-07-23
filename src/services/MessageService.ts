import { load } from "@tauri-apps/plugin-store";

import {
  reminderMessages,
  successMessages,
  snoozeMessages,
  drinkWaterMessages,
} from "../constants/messages";

import { randomItem } from "../utils/random";

const RAW_URL = import.meta.env.VITE_MESSAGES_URL;

const STORE_FILE = "settings.json";
const MESSAGE_KEY = "messages";

type MessageConfig = {
  version: number;
  lastUpdated: string;

  reminderMessages: string[];
  successMessages: string[];
  snoozeMessages: string[];
  drinkWaterMessages: string[];
};

class MessageService {
  private messages: MessageConfig = {
  version: 1,
  lastUpdated: "local",

  reminderMessages,
  successMessages,
  snoozeMessages,
  drinkWaterMessages,
};

  private storePromise = load(STORE_FILE);

  async initialize() {
    await this.loadCachedMessages();

    // Don't block app startup
    this.refreshFromGithub();
  }

  private async loadCachedMessages() {
    try {
      const store = await this.storePromise;

      const cached = await store.get<MessageConfig>(MESSAGE_KEY);

      if (cached) {
        this.messages = cached;
        console.log("✅ Loaded cached messages");
      } else {
        console.log("ℹ️ No cached messages found");
      }
    } catch (err) {
      console.warn("Failed to load cached messages", err);
    }
  }

  private async refreshFromGithub() {
    try {
      const today = new Date().toISOString().split("T")[0];
const response = await fetch(`${RAW_URL}?v=${today}`);
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data: MessageConfig = await response.json();

      console.log(
  `📦 Local version: ${this.messages.version} | ☁️ GitHub version: ${data.version}`
);

if (data.version === this.messages.version) {
  console.log("✅ Messages already up to date.");
  return;
}

      this.messages = {
  version: data.version,
  lastUpdated: data.lastUpdated,

  reminderMessages: data.reminderMessages ?? reminderMessages,
  successMessages: data.successMessages ?? successMessages,
  snoozeMessages: data.snoozeMessages ?? snoozeMessages,
  drinkWaterMessages: data.drinkWaterMessages ?? drinkWaterMessages,
};

      const store = await this.storePromise;

      await store.set(MESSAGE_KEY, this.messages);
      await store.save();

      console.log("✅ Messages updated from GitHub");
    } catch (err) {
      console.warn("Using existing/local messages", err);
    }
  }

  getReminderMessage() {
    const message = randomItem(this.messages.reminderMessages);
  console.log("Selected:", message);
  return message;
  }

  getSuccessMessage() {
    return randomItem(this.messages.successMessages);
  }

  getSnoozeMessage() {
    return randomItem(this.messages.snoozeMessages);
  }

  getDrinkWaterMessage(minutes: number) {
    return randomItem(this.messages.drinkWaterMessages)
      .replace("{minutes}", minutes.toString())
      .replace("{plural}", minutes === 1 ? "" : "s");
  }
}

export default new MessageService();