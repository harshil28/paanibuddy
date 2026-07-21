import { hideWindow, showWindow } from "../services/window";
import ReminderScheduler from "../scheduler/ReminderScheduler";

import {
  reminderMessages,
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

async showReminder() {
  console.log("showReminder called");

  const store = useCompanionStore.getState();

  console.log("Current state:", store.state);

  store.setMessage(randomItem(reminderMessages));
  store.setState("entering");

  console.log("State after entering:", useCompanionStore.getState().state);

  await showWindow();

  await sleep(ENTER_ANIMATION_MS);

  store.setState("visible");

  console.log("State after visible:", useCompanionStore.getState().state);

  this.startAutoDismiss();
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

    store.setMessage(
      `👋 See you in ${reminderMinutes} minute${reminderMinutes === 1 ? "" : "s"
      }!`
    );

    await sleep(GOODBYE_MESSAGE_MS);

    await this.hideReminder();

ReminderScheduler.restart();

  }

  async snooze() {
    console.log("2. snooze");
    this.clearAutoDismiss();

    const store = useCompanionStore.getState();

    store.setMessage("😴 Alright... A few more minutes.");

    await sleep(SUCCESS_MESSAGE_MS);

    await this.hideReminder();

ReminderScheduler.scheduleSnooze(
    useSettingsStore.getState().settings.snoozeMinutes
);
  }
}

export default new ReminderController();