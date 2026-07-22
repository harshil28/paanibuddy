import { useEffect, useState } from "react";
import { listen } from "@tauri-apps/api/event";

import Companion from "./components/Companion/Companion";
import ReminderScheduler from "./scheduler/ReminderScheduler";
import ReminderController from "./controller/ReminderController";

import SettingsModal from "./components/Settings/SettingsModal";

import { useSettingsStore } from "./store/settingsStore";
import type { CompanionMode } from "./types/companion";

function App() {
    const [showSettings, setShowSettings] = useState(false);
    const [mode, setMode] = useState<CompanionMode>("reminder");

    const handleLetsGo = async () => {
        const store = useSettingsStore.getState();

        await store.save({
            ...store.settings,
            firstLaunchCompleted: true,
        });

        await ReminderController.finishWelcome();

        setMode("reminder");

        ReminderScheduler.start();
    };

    useEffect(() => {
        let previousSettings = useSettingsStore.getState().settings;

        const init = async () => {
            await useSettingsStore.getState().load();

            previousSettings = useSettingsStore.getState().settings;

            const settings = useSettingsStore.getState().settings;

            console.log("Starting scheduler");
console.log("First launch:", settings.firstLaunchCompleted);
            setTimeout(async () => {
                if (!settings.firstLaunchCompleted) {
                    console.log("Showing welcome");
                    setMode("welcome");

                    await ReminderController.showWelcome();
                } else {
                    console.log("Showing reminder");
                    setMode("reminder");

                    await ReminderController.showReminder();

                    ReminderScheduler.start();
                }
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
                setMode("reminder");
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
            <Companion
                mode={mode}
                onLetsGo={handleLetsGo}
                onOpenSettings={() => setShowSettings(true)}
            />

            <SettingsModal
                open={showSettings}
                onClose={() => setShowSettings(false)}
            />
        </div>
    );
}

export default App;