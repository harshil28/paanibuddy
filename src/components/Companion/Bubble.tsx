import { motion, AnimatePresence } from "framer-motion";

interface BubbleProps {
    message: string;
    visible: boolean;
}

export default function Bubble({
    message,
    visible,
}: BubbleProps) {
    return (
        <AnimatePresence mode="wait">
            {visible && (
                <motion.div
                    key={message}
                    className="bubble"
                    initial={{
                        opacity: 0,
                        y: -18,
                        scale: 0.9,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                    }}
                    exit={{
                        opacity: 0,
                        y: -12,
                        scale: 0.95,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 24,
                    }}
                >
                    <motion.span
    className="bubble-text"
    animate={{
        y: [0, -1, 0],
    }}
    transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
    }}
>
    {message}
</motion.span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}