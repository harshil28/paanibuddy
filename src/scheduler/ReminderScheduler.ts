import ReminderController from "../controller/ReminderController";
import { useSettingsStore } from "../store/settingsStore";

class ReminderScheduler {
    private timer: number | null = null;
    private running = false;

    start() {
        if (this.running) return;

        this.running = true;
        this.scheduleNext();
    }

    stop() {
        this.running = false;

        this.clearTimer();
    }

    restart() {
        this.stop();
        this.start();
    }

    scheduleAfter(minutes: number) {
        console.log("scheduleAfter:", minutes);
        if (!this.running) return;

        this.clearTimer();

        this.timer = window.setTimeout(async () => {
            console.log("scheduleAfter fired");
            if (!this.running) return;

            await ReminderController.showReminder();

            // Resume normal reminder cycle
            this.scheduleNext();
        }, minutes * 60 * 1000);
    }

    private scheduleNext() {
        if (!this.running) return;

        this.clearTimer();

        const {
            reminderInterval,
            startHour,
            endHour,
        } = useSettingsStore.getState().settings;

        this.timer = window.setTimeout(async () => {
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