import { motion } from "framer-motion";

import idle from "../../assets/idle.png";
import drink from "../../assets/drink.png";

import type { CompanionState } from "../../types/companion";

interface Props {
  state: CompanionState;
}

export default function Character({ state }: Props) {
  return (
    <motion.img
      src={state === "drinking" ? drink : idle}
      alt="Hydro Buddy"
      className="character"
      animate={{
        scale:
          state === "drinking"
            ? [1, 1.08, 1]
            : 1,
      }}
      transition={{
        duration: 0.4,
      }}
    />
  );
}