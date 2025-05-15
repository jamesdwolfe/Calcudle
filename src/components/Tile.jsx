import React from "react";

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

    return (
        <div className={`${baseStyle} ${tileStyle}`}>
            {char}
        </div>
    );
};