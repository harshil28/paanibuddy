import { motion } from "framer-motion";
import { Settings, X } from "lucide-react";

import Bubble from "./Bubble";
import Character from "./Character";
import ActionButtons from "./ActionButtons";

import { useCompanionStore } from "../../store/companionStore";
import ReminderController from "../../controller/ReminderController";

import "./Companion.css";
import type { CompanionMode } from "../../types/companion";

const variants = {
    entering: { x: 0, opacity: 1 },
    visible: { x: 0, opacity: 1 },
    drinking: { x: 0, opacity: 1, scale: 1.03 },
    leaving: { x: 180, opacity: 0 },
};

interface Props {
    onOpenSettings?: () => void;
    onLetsGo?: () => void;
    mode: CompanionMode;
}

export default function Companion({
    onOpenSettings,
    onLetsGo,
    mode,
}: Props) {
    const { state, message } = useCompanionStore();
    
    return (
        <motion.div
            className="companion"
            initial={{
                x: 180,
                opacity: 0,
            }}
            animate={state}
            variants={variants}
            transition={{
                duration: .55,
                ease: "easeOut",
            }}
        >
            <div className="toolbar">
                <button
                    className="toolbar-btn"
                    onClick={onOpenSettings}
                >
                    <Settings size={13} strokeWidth={2.2} />
                </button>

                <button
                    className="toolbar-btn close"
                    onClick={() => ReminderController.hideReminder()}
                >
                    <X size={13} strokeWidth={2.4} />
                </button>
            </div>

            <Bubble
                message={message}
                visible={state !== "leaving"}
            />

            <Character state={state} />

            <ActionButtons
    mode={mode}
    disabled={state !== "visible"}
    onDrink={() => ReminderController.drinkWater()}
    onSnooze={() => ReminderController.snooze()}
    onLetsGo={onLetsGo}
/>
        </motion.div>
    );
}