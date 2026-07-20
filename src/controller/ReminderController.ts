import { hideWindow, showWindow } from "../services/window";

import { goodbyeMessages, reminderMessages, successMessages } from "../constants/messages";
import { randomItem } from "../utils/random";
import { sleep } from "../utils/sleep";

import { useCompanionStore } from "../store/companionStore";
import { GOODBYE_MESSAGE_MS, SUCCESS_MESSAGE_MS } from "../constants/timings";

import {
  AUTO_DISMISS_DELAY,
  SNOOZE_DELAY,
} from "../config";

class ReminderController {

  private autoDismissTimer: number | null = null;

private startAutoDismiss() {
  this.clearAutoDismiss();

  this.autoDismissTimer = window.setTimeout(() => {
    this.hideReminder();
  }, AUTO_DISMISS_DELAY);
}

private clearAutoDismiss() {
  if (this.autoDismissTimer) {
    clearTimeout(this.autoDismissTimer);
    this.autoDismissTimer = null;
  }
}

  async showReminder() {
  const store = useCompanionStore.getState();

  store.setMessage(randomItem(reminderMessages));
  store.setState("entering");

  await showWindow();

  await sleep(600);

  store.setState("visible");

  this.startAutoDismiss();
}

  async hideReminder() {
    const store = useCompanionStore.getState();

    store.setState("leaving");

    await sleep(600);

    await hideWindow();

    store.setState("visible");
    store.setMessage(randomItem(reminderMessages));
  }

  async drinkWater() {

  this.clearAutoDismiss();

  const store = useCompanionStore.getState();

  store.setState("drinking");

  store.setMessage(randomItem(successMessages));

  await sleep(1500);

  store.setMessage("👋 See you in 45 minutes!");

  await sleep(2200);

  await this.hideReminder();

}

  async snooze() {

  this.clearAutoDismiss();

  const store = useCompanionStore.getState();

  store.setMessage("😴 Alright... 5 more minutes.");

  await sleep(1500);

  await this.hideReminder();

  setTimeout(() => {

      this.showReminder();

  }, SNOOZE_DELAY);

}}

export default new ReminderController();