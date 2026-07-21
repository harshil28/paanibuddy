import ReminderController from "../controller/ReminderController";
import { useSettingsStore } from "../store/settingsStore";

class ReminderScheduler {
    private timer: number | null = null;
    private running = false;

    start() {
        if (this.running) return;

        this.running = true;
<<<<<<< HEAD
        this.scheduleNextReminder();
=======
        this.scheduleNext();
>>>>>>> 9a7989679031228215f33fa8923a2d5acd3578f1
    }

    stop() {
        this.running = false;

<<<<<<< HEAD
        if (this.timer !== null) {
            clearTimeout(this.timer);
            this.timer = null;
        }
=======
        this.clearTimer();
>>>>>>> 9a7989679031228215f33fa8923a2d5acd3578f1
    }

    restart() {
        this.stop();
        this.start();
    }

<<<<<<< HEAD
    scheduleSnooze(minutes: number) {
=======
    scheduleAfter(minutes: number) {
        console.log("scheduleAfter:", minutes);
>>>>>>> 9a7989679031228215f33fa8923a2d5acd3578f1
        if (!this.running) return;

        this.clearTimer();

        this.timer = window.setTimeout(async () => {
<<<<<<< HEAD
=======
            console.log("scheduleAfter fired");
>>>>>>> 9a7989679031228215f33fa8923a2d5acd3578f1
            if (!this.running) return;

            await ReminderController.showReminder();

<<<<<<< HEAD
        }, minutes * 60 * 1000);
    }

    private scheduleNextReminder() {
=======
            // Resume normal reminder cycle
            this.scheduleNext();
        }, minutes * 60 * 1000);
    }

    private scheduleNext() {
>>>>>>> 9a7989679031228215f33fa8923a2d5acd3578f1
        if (!this.running) return;

        this.clearTimer();

        const {
            reminderInterval,
            startHour,
            endHour,
        } = useSettingsStore.getState().settings;

        this.timer = window.setTimeout(async () => {
<<<<<<< HEAD

            if (!this.running) return;

            const hour = new Date().getHours();

            if (
                hour >= startHour &&
                hour < endHour
            ) {
                await ReminderController.showReminder();
            }

            this.scheduleNextReminder();
=======
            if (!this.running) return;

            const currentHour = new Date().getHours();

            const insideWorkingHours =
                currentHour >= startHour &&
                currentHour < endHour;

            if (insideWorkingHours) {
                await ReminderController.showReminder();
            }

            // Schedule the next reminder
            this.scheduleNext();
>>>>>>> 9a7989679031228215f33fa8923a2d5acd3578f1

        }, reminderInterval * 60 * 1000);
    }

    private clearTimer() {
        if (this.timer !== null) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
}

export default new ReminderScheduler();