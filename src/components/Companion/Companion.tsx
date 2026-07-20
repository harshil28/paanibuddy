import { motion } from "framer-motion";

import Bubble from "./Bubble";
import Character from "./Character";
import ActionButtons from "./ActionButtons";

import { useCompanionStore } from "../../store/companionStore";
import ReminderController from "../../controller/ReminderController";

import "./Companion.css";

const variants = {
  entering: {
    x: 0,
    opacity: 1,
  },

  visible: {
    x: 0,
    opacity: 1,
  },

  drinking: {
    x: 0,
    opacity: 1,
    scale: 1.03,
  },

  leaving: {
    x: 250,
    opacity: 0,
  },
};

export default function Companion() {
  const { state, message } = useCompanionStore();

  const isBusy =
    state === "drinking" ||
    state === "leaving";

  return (
    <motion.div
      className="companion"
      initial={{
        x: 250,
        opacity: 0
      }}
      animate={state}
      variants={variants}
      transition={{
        duration: .55,
        ease: "easeOut"
      }}
    >
      <Bubble
        message={message}
        visible={state !== "leaving"}
      />

      <Character state={state} />

      <ActionButtons
        disabled={isBusy}
        onDrink={() => ReminderController.drinkWater()}
        onSnooze={() => ReminderController.snooze()}
      />
    </motion.div>
  );
}