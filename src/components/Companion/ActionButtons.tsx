import { motion } from "framer-motion";

interface Props {
  onDrink: () => void;
  onSnooze: () => void;
  disabled: boolean;
}

export default function ActionButtons({
  onDrink,
  onSnooze,
  disabled,
}: Props) {
  return (
    <motion.div
      className="buttons"
      animate={{
        opacity: disabled ? 0 : 1,
        y: disabled ? 10 : 0,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <button
        className="drink"
        disabled={disabled}
        onClick={onDrink}
      >
        Drank Water
      </button>

      <button
        disabled={disabled}
        onClick={onSnooze}
      >
        Snooze
      </button>
    </motion.div>
  );
}