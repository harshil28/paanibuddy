import { getCurrentWindow } from "@tauri-apps/api/window";

const appWindow = getCurrentWindow();

export async function showWindow() {
    await appWindow.show();
}

export async function hideWindow() {
    await appWindow.hide();
}