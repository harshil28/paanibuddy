import ReminderController from "../controller/ReminderController";
import { useSettingsStore } from "../store/settingsStore";

class ReminderScheduler {
    private timer: number | null = null;
    private running = false;

    start() {
        if (this.running) return;

        this.running = true;
        this.scheduleNextReminder();
    }

    stop() {
        this.running = false;

        if (this.timer !== null) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    restart() {
        this.stop();
        this.start();
    }

    scheduleSnooze(minutes: number) {
        if (!this.running) return;

        this.clearTimer();

        this.timer = window.setTimeout(async () => {
            if (!this.running) return;

            await ReminderController.showReminder();

        }, minutes * 60 * 1000);
    }

    private scheduleNextReminder() {
        if (!this.running) return;

        this.clearTimer();

        const {
            reminderInterval,
            startHour,
            endHour,
        } = useSettingsStore.getState().settings;

        this.timer = window.setTimeout(async () => {

            if (!this.running) return;

            const hour = new Date().getHours();

            if (
                hour >= startHour &&
                hour < endHour
            ) {
                await ReminderController.showReminder();
            }

            this.scheduleNextReminder();

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