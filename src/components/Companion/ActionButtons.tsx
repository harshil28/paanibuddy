import { motion } from "framer-motion";
import type { CompanionMode } from "../../types/companion";

interface Props {
    mode?: CompanionMode;

    onDrink?: () => void;
    onSnooze?: () => void;

    onLetsGo?: () => void;

    disabled: boolean;
}

export default function ActionButtons({
    mode = "reminder",
    onDrink,
    onSnooze,
    onLetsGo,
    disabled,
}: Props) {
    return (
        <motion.div
            className="buttons"
            animate={{
                opacity: disabled ? 0 : 1,
                y: disabled ? 8 : 0,
            }}
            transition={{
                duration: 0.25,
            }}
        >
            {mode === "welcome" ? (
                <button
                    className="entry"
                    disabled={disabled}
                    onClick={onLetsGo}
                >
                    👋 Let's Go
                </button>
            ) : (
                <>
                    <button
                        className="drink"
                        disabled={disabled}
                        onClick={onDrink}
                    >
                        💧 Drink
                    </button>

                    <button
                        className="snooze"
                        disabled={disabled}
                        onClick={onSnooze}
                    >
                        Snooze
                    </button>
                </>
            )}
        </motion.div>
    );
}