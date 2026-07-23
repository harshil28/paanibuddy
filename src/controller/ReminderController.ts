import { hideWindow, showWindow } from "../services/window";
import ReminderScheduler from "../scheduler/ReminderScheduler";

// import {
//   drinkWaterMessages,
//   reminderMessages,
//   snoozeMessages,
//   successMessages,
// } from "../constants/messages";
// import { randomItem } from "../utils/random";

import MessageService from "../services/MessageService";
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
console.trace("showReminder called");
    const store = useCompanionStore.getState();

    store.setMessage(
    message ?? MessageService.getReminderMessage()
);
    store.setState("entering");

    await showWindow();

    await sleep(ENTER_ANIMATION_MS);

    store.setState("visible");

    if (autoDismiss) {
        this.startAutoDismiss();
    }
}

async showWelcome() {
    await this.showReminder(`👋 Hi Het! I'm Paani Buddy.
      Hu jarak jarak vaare aavti rais, paani nu yaad karava.`,
        false
    );
}

  async hideReminder() {
    this.clearAutoDismiss();

    const store = useCompanionStore.getState();

    if (store.state === "leaving") return;

    store.setState("leaving");

    await sleep(EXIT_ANIMATION_MS);

    await hideWindow();
}

  async drinkWater() {
    this.clearAutoDismiss();

    const store = useCompanionStore.getState();

    store.setState("drinking");
    store.setMessage(MessageService.getSuccessMessage());

    await sleep(SUCCESS_MESSAGE_MS);

    const reminderMinutes =
      useSettingsStore.getState().settings.reminderInterval;

    store.setMessage(
    MessageService.getDrinkWaterMessage(reminderMinutes)
);

    await sleep(GOODBYE_MESSAGE_MS);

    await this.hideReminder();

ReminderScheduler.restart();

  }

  async finishWelcome() {
    this.clearAutoDismiss();

    const store = useCompanionStore.getState();

    store.setMessage(
`Chalo Sarass!! Malta rehsu have !!😁✨`
);

    await sleep(GOODBYE_MESSAGE_MS);

    await this.hideReminder();
}

  async snooze() {
    this.clearAutoDismiss();

    const store = useCompanionStore.getState();

    store.setMessage(
    MessageService.getSnoozeMessage()
);

    await sleep(SUCCESS_MESSAGE_MS);

    await this.hideReminder();

ReminderScheduler.scheduleSnooze(
    useSettingsStore.getState().settings.snoozeMinutes
);
  }
}

export default new ReminderController();