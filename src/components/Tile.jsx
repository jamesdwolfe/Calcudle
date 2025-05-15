import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const Tile = ({ char, status, isOperator }) => {
    const baseStyle = "w-10 h-10 m-1 flex items-center justify-center text-xl font-bold rounded";

    let tileStyle;
    if (isOperator) {
        tileStyle = "bg-blue-500 text-white";
    } else {
        switch (status) {
            case "correct":
                tileStyle = "bg-green-500 text-white";
                break;
            case "misplaced":
                tileStyle = "bg-yellow-500 text-white";
                break;
            case "not-in-solution":
                tileStyle = "bg-gray-300 text-white";
                break;
            default:
                tileStyle = "bg-gray-200 text-black";
        }
    }

    const hasMounted = useRef(false);
    const [prevChar, setPrevChar] = useState(char);
    const [shouldAnimate, setShouldAnimate] = useState(false);

    useEffect(() => {
        if (hasMounted.current) {
            if (char !== prevChar && char.trim() !== "" && !isOperator) {
                setShouldAnimate(true);
            }
        } else {
            hasMounted.current = true;
        }
        setPrevChar(char);
    }, [char, prevChar, isOperator]);

    return (
        <motion.div
            animate={shouldAnimate ? { scale: [1, 1.2, 1] } : { scale: 1 }}
            transition={{
                duration: 0.25,
                ease: "easeOut"
            }}
            onAnimationComplete={() => setShouldAnimate(false)}
            className={`${baseStyle} ${tileStyle}`}
        >
            {char}
        </motion.div>
    );
};
