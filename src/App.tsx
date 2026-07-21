import { useEffect, useState } from "react";
import { listen } from "@tauri-apps/api/event";

import Companion from "./components/Companion/Companion";
import ReminderScheduler from "./scheduler/ReminderScheduler";
import ReminderController from "./controller/ReminderController";

import SettingsModal from "./components/Settings/SettingsModal";

import { useSettingsStore } from "./store/settingsStore";

function App() {
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        let previousSettings = useSettingsStore.getState().settings;

        const init = async () => {
            await useSettingsStore.getState().load();

            previousSettings = useSettingsStore.getState().settings;

            console.log("Starting scheduler");

            setTimeout(async () => {
    await ReminderController.showReminder();

    ReminderScheduler.start();
}, 2000);
            
        };

        init();

        const unsubscribe = useSettingsStore.subscribe((state) => {
            const current = state.settings;

            const timingChanged =
                previousSettings.reminderInterval !== current.reminderInterval ||
                previousSettings.startHour !== current.startHour ||
                previousSettings.endHour !== current.endHour;

            if (timingChanged) {
                ReminderScheduler.restart();
            }

            previousSettings = current;
        });

        let unlistenSettings: (() => void) | undefined;
        let unlistenReminder: (() => void) | undefined;

        (async () => {
            unlistenSettings = await listen("open-settings", () => {
                setShowSettings(true);
            });

            unlistenReminder = await listen("show-reminder", () => {
                ReminderController.showReminder();
            });
        })();

        return () => {
            unsubscribe();
            ReminderScheduler.stop();

            unlistenSettings?.();
            unlistenReminder?.();
        };
    }, []);

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "transparent",
            }}
        >
            <Companion />

            <SettingsModal
                open={showSettings}
                onClose={() => setShowSettings(false)}
            />

            {!showSettings && (
                <button
                    onClick={() => setShowSettings(true)}
                    style={{
                        position: "fixed",
                        top: 20,
                        right: 20,
                        zIndex: 10000,
                    }}
                >
                    ⚙
                </button>
            )}
        </div>
    );
}

export default App;