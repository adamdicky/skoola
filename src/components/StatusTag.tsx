import React from "react";

interface TagProps {
    name: string;
    color?: "red" | "green" | "blue" | "yellow"; // extend as needed
}

export const Tag: React.FC<TagProps> = ({ name, color = "gray" }) => {
    const colorMap: Record<string, string> = {
        red: "border-red-500 text-red-600 bg-red-50",
        green: "border-green-400 text-green-400 bg-green-50",
        blue: "border-blue-400 text-blue-400 bg-blue-50",
        yellow: "border-yellow-400 text-yellow-400 bg-yellow-50",
    };

    return (
        <span
            className={`min-w-[100px] max-w-[120px] text-center py-1 rounded-full border font-semibold text-sm ${colorMap[color]}`}
        >
            {name}
        </span>
    );
};
