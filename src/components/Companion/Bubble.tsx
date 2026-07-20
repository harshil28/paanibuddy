import { motion, AnimatePresence } from "framer-motion";

interface BubbleProps {
  message: string;
  visible: boolean;
}

export default function Bubble({ message, visible }: BubbleProps) {
  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={message}
          className="bubble"
          initial={{
            opacity: 0,
            y: -15,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -15,
            scale: 0.95,
          }}
          transition={{
    type: "spring",
    stiffness: 250,
    damping: 20
}}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}