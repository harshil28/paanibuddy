export const DEV_MODE = true;
export const IS_DEV = import.meta.env.DEV;

// Testing

// export const REMINDER_INTERVAL = DEV_MODE
//   ? 30 * 1000 // 30 sec
//   : 45 * 60 * 1000;

// export const SNOOZE_DELAY = DEV_MODE
//   ? 10 * 1000 // 10 sec
//   : 5 * 60 * 1000;

// export const AUTO_DISMISS_DELAY = DEV_MODE
//   ? 20 * 1000 // 20 sec
//   : 30 * 1000;

export const REMINDER_INTERVAL = IS_DEV
    ? 30 * 1000 // 30 sec
    : 45 * 60 * 1000;

export const SNOOZE_DELAY = IS_DEV
    ? 10 * 1000 // 10 sec
    : 5 * 60 * 1000;

export const AUTO_DISMISS_DELAY = IS_DEV
    ? 20 * 1000 // 20 sec
    : 30 * 1000;