import { getCurrentWindow } from "@tauri-apps/api/window";
import { DEV_MODE } from "../config";


const appWindow = getCurrentWindow();

export async function showWindow() {
  if (!DEV_MODE) {
    await appWindow.show();
  }
}

export async function hideWindow() {
  if (!import.meta.env.DEV) {
    await appWindow.hide();
  }
}