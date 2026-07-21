import { useEffect } from "react";

import Companion from "./components/Companion/Companion";
import ReminderScheduler from "./scheduler/ReminderScheduler";
import { useSettingsStore } from "./store/settingsStore";

import { useState } from "react";
import SettingsModal from "./components/Settings/SettingsModal";
import ReminderController from "./controller/ReminderController";

function App() {
  useEffect(() => {
    let previousSettings = useSettingsStore.getState().settings;

    const init = async () => {
    await useSettingsStore.getState().load();

    previousSettings = useSettingsStore.getState().settings;

    console.log("Starting scheduler");

    ReminderScheduler.start();

    if(import.meta.env.DEV){

setTimeout(()=>{
ReminderController.showReminder();
},1000);

}

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

    return () => {
        unsubscribe();
        ReminderScheduler.stop();
    };
}, []);

const [showSettings, setShowSettings] = useState(false);

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
    </div>
  );
}

export default App;