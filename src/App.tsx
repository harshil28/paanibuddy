import { useEffect } from "react";

import Companion from "./components/Companion/Companion";

import ReminderController from "./controller/ReminderController";
import ReminderScheduler from "./scheduler/ReminderScheduler";

function App() {
  useEffect(() => {

  // ReminderScheduler.start();

  // Show first reminder immediately while developing
  if(import.meta.env.DEV){

      ReminderController.showReminder();

  }

},[]);

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
    </div>
  );
}

export default App;