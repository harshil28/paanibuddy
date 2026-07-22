export interface Settings {
    reminderInterval: number;
    snoozeMinutes: number;
    startHour: number;
    endHour: number;
    launchOnStartup: boolean;
    firstLaunchCompleted: boolean;
}

export const DEFAULT_SETTINGS = {
    reminderInterval: 45,
    snoozeMinutes: 2,
    startHour: 10,
    endHour: 23,
    launchOnStartup: false,
    firstLaunchCompleted: false,
};