import { X } from "lucide-react";

interface TagProps {
    name: string;
    color?: "red" | "green" | "blue" | "yellow" | "gray"; // extend as needed
}

export const FilterTag: React.FC<TagProps & { onRemove?: () => void }> = ({ name, color = "gray", onRemove }) => {
    const colorMap: Record<string, string> = {
        red: "border-red-500 text-red-600 bg-red-50",
        green: "border-green-500 text-green-600 bg-green-50",
        blue: "border-blue-500 text-blue-600 bg-blue-50",
        gray: "border-gray-400 text-gray-600 bg-gray-50",
    };

    return (
        <span
            className={`flex items-center gap-1 px-3 py-1 rounded-full border font-semibold text-sm ${colorMap[color]}`}
        >
            {name}
            {onRemove && (
                <button onClick={onRemove} className="ml-1 hover:text-black">
                    <X className="h-3 w-3" />
                </button>
            )}
        </span>
    );
};
