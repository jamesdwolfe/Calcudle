import React from "react";

export const Button = ({ children, className = "", ...props }) => {
    return (
        <button
            className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
