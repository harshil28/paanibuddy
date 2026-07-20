import ReminderController from "../controller/ReminderController";
import { REMINDER_INTERVAL } from "../config";

class ReminderScheduler {

  private timer: number | null = null;

  start() {

    this.stop();

    this.timer = window.setInterval(() => {

      ReminderController.showReminder();

    }, REMINDER_INTERVAL);

  }

  stop() {

    if(this.timer){

      clearInterval(this.timer);

    }

  }

}

export default new ReminderScheduler();