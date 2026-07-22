import { hideWindow, showWindow } from "../services/window";
import ReminderScheduler from "../scheduler/ReminderScheduler";

import {
  drinkWaterMessages,
  reminderMessages,
  snoozeMessages,
  successMessages,
} from "../constants/messages";
import { randomItem } from "../utils/random";
import { sleep } from "../utils/sleep";

import { useCompanionStore } from "../store/companionStore";
import { useSettingsStore } from "../store/settingsStore";

import {
  ENTER_ANIMATION_MS,
  EXIT_ANIMATION_MS,
  GOODBYE_MESSAGE_MS,
  SUCCESS_MESSAGE_MS,
} from "../constants/timings";

class ReminderController {
  async dismiss() {
    this.clearAutoDismiss();

    await this.hideReminder();

    ReminderScheduler.restart();
}
  private autoDismissTimer: number | null = null;

  private startAutoDismiss() {
    this.clearAutoDismiss();

    // Auto hide reminder after 30 seconds if user does nothing
    this.autoDismissTimer = window.setTimeout(() => {
      this.hideReminder();
    }, 30 * 1000);
  }

  private clearAutoDismiss() {
    if (this.autoDismissTimer) {
      clearTimeout(this.autoDismissTimer);
      this.autoDismissTimer = null;
    }
  }

async showReminder(message?: string, autoDismiss = true) {
    console.log("showReminder called");

    const store = useCompanionStore.getState();

    store.setMessage(message ?? randomItem(reminderMessages));
    store.setState("entering");

    await showWindow();

    await sleep(ENTER_ANIMATION_MS);

    store.setState("visible");

    if (autoDismiss) {
        this.startAutoDismiss();
    }
}

async showWelcome() {
  console.log("1. showWelcome");
    await this.showReminder(
        `👋 Hi there! I'm Paani Buddy.
I'll pop in every now and then to remind you to stay hydrated.`,
        false
    );
}

  async hideReminder() {
    console.log("3. hideReminder");
    this.clearAutoDismiss();

    const store = useCompanionStore.getState();

    if (store.state === "leaving") return;

    store.setState("leaving");

    await sleep(EXIT_ANIMATION_MS);

    await hideWindow();

store.setMessage(randomItem(reminderMessages));
    console.log("4. hideReminder complete");
  }

  async drinkWater() {
    console.log("2. drinkWater")
    this.clearAutoDismiss();

    const store = useCompanionStore.getState();

    store.setState("drinking");
    store.setMessage(randomItem(successMessages));

    await sleep(SUCCESS_MESSAGE_MS);

    const reminderMinutes =
      useSettingsStore.getState().settings.reminderInterval;

    store.setMessage(randomItem(drinkWaterMessages)(reminderMinutes));

    await sleep(GOODBYE_MESSAGE_MS);

    await this.hideReminder();

ReminderScheduler.restart();

  }

  async finishWelcome() {
    console.log("2. finishWelcome triggered");
    this.clearAutoDismiss();

    const store = useCompanionStore.getState();

    store.setMessage(
`Chalo Sarass!! Malta rehsu have !!`
);

    await sleep(GOODBYE_MESSAGE_MS);

    await this.hideReminder();
}

  async snooze() {
    console.log("2. snooze");
    this.clearAutoDismiss();

    const store = useCompanionStore.getState();

    store.setMessage(randomItem(snoozeMessages));

    await sleep(SUCCESS_MESSAGE_MS);

    await this.hideReminder();

ReminderScheduler.scheduleSnooze(
    useSettingsStore.getState().settings.snoozeMinutes
);
  }
}

export default new ReminderController();