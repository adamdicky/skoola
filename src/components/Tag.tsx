// components/Tag.tsx
import React from "react";

interface TagProps {
    name: string;
    color?: "red" | "green" | "blue" | "yellow" | "gray"; // extend as needed
}

export const Tag: React.FC<TagProps> = ({ name, color = "gray" }) => {
    const colorMap: Record<string, string> = {
        red: "border-red-500 text-red-600 bg-red-50",
        green: "border-green-500 text-green-600 bg-green-50",
        blue: "border-blue-500 text-blue-600 bg-blue-50",
        yellow: "border-yellow-500 text-yellow-600 bg-yellow-50",
        gray: "border-gray-400 text-gray-600 bg-gray-50",
    };

    return (
        <span
            className={`px-3 py-1 rounded-full border font-semibold text-sm ${colorMap[color]}`}
        >
            {name}
        </span>
    );
};
