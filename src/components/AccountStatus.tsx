import React from "react";

import { LockKeyIcon, LockKeyOpenIcon } from "@phosphor-icons/react";

interface AccountStatusProps {
    name: string;
    color?: "red" | "green";
}

export const AccountStatus: React.FC<AccountStatusProps> = ({ name, color = "" }) => {
    const colorMap: Record<string, string> = {
        red: "border-red-500 text-red-500 bg-red-50 hover:bg-red-500 hover:text-white",
        green: "border-green-400 text-green-400 bg-green-50 hover:bg-green-400 hover:text-white",
    };

    const Icon = color === "red" ? LockKeyIcon : LockKeyOpenIcon;

    return (
        <span
            className={`min-w-[115px] max-w-[120px] text-center py-1.5 px-4 rounded-full border font-semibold text-sm ${colorMap[color]}`}
        >
            {name}
            <Icon className="inline-block ml-1" size={18} weight="bold" />
        </span>
    );
};
