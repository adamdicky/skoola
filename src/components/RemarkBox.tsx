import React from "react";
import { ChatIcon } from "@phosphor-icons/react";

const RemarkBox = () => {
    return (
        <div className="flex flex-col p-3 gap-1 bg-[#E0F2FE] border-1 border-[#0095FF] rounded-md">
            <div className="flex flex-row items-center gap-2">
                <ChatIcon size={20} weight="bold" className='text-[#007BD3]' />
                <a className="text-[#007BD3] font-semibold">Admin Remarks</a>
            </div>
            <a className="text-[#007BD3] font-medium  max-h-15 overflow-y-auto pr-2 leading-5 text-justify">Please add specific time slots and room numbers for better clarity. Please add specific time slots and room numbers for better clarity. Please add specific time slots and room numbers for better clarity. Please add specific time slots and room numbers for better clarity.</a>
        </div>
    );
};

export default RemarkBox;
