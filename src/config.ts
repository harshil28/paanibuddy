export const DEV_MODE = true;

// Testing

export const REMINDER_INTERVAL = DEV_MODE
  ? 30 * 1000 // 30 sec
  : 45 * 60 * 1000;

export const SNOOZE_DELAY = DEV_MODE
  ? 10 * 1000 // 10 sec
  : 5 * 60 * 1000;

export const AUTO_DISMISS_DELAY = DEV_MODE
  ? 20 * 1000 // 20 sec
  : 30 * 1000;