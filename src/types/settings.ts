export interface Settings {
    reminderInterval: number;
    snoozeMinutes: number;
    startHour: number;
    endHour: number;
    launchOnStartup: boolean;
}

export const DEFAULT_SETTINGS = {
    reminderInterval: 45,
    snoozeMinutes: 5,
    startHour: 10,
    endHour: 23,
    launchOnStartup: false,
};