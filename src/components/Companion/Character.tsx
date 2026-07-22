import { motion } from "framer-motion";
import { useMemo } from "react";

import { characters } from "../../assets/characters";

import type { CompanionState } from "../../types/companion";

interface Props {
    state: CompanionState;
}

export default function Character({ state }: Props) {

    const character = useMemo(() => {
        return characters[
            Math.floor(Math.random() * characters.length)
        ];
    }, []);

    return (
        <motion.img
            src={
                state === "drinking"
                    ? character.drink
                    : character.idle
            }
            alt="Paani Buddy"
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