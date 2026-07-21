import { useCompanionStore } from "../store/companionStore";

export default function DebugPanel() {
  const {
    show,
    hide,
    drinkWater,
    snooze,
  } = useCompanionStore();

  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <button onClick={show}>Show</button>

      <button onClick={hide}>Hide</button>

      <button onClick={drinkWater}>Drink</button>

      <button onClick={snooze}>Snooze</button>
    </div>
  );
}