import { getCurrentWindow } from "@tauri-apps/api/window";
<<<<<<< HEAD
=======
import { DEV_MODE } from "../config";

>>>>>>> 9a7989679031228215f33fa8923a2d5acd3578f1

const appWindow = getCurrentWindow();

export async function showWindow() {
<<<<<<< HEAD
    await appWindow.show();
}

export async function hideWindow() {
    await appWindow.hide();
=======
  if (!DEV_MODE) {
    await appWindow.show();
  }
}

export async function hideWindow() {
  if (!import.meta.env.DEV) {
    await appWindow.hide();
  }
>>>>>>> 9a7989679031228215f33fa8923a2d5acd3578f1
}