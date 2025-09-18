import React from "react";
import { ChatIcon } from "@phosphor-icons/react";
import { Textarea } from "@/components/ui/textarea";

interface AddRemarkBoxProps {
    value: string;
    onChange: (value: string) => void;
}

const AddRemarkBox: React.FC<AddRemarkBoxProps> = ({ value, onChange }) => {
    return (
        <div className="flex flex-col p-3 gap-3 bg-[#FFFFFF] border-1 border-[#B5B5B5] rounded-md">
            <div className="flex flex-row items-center gap-2">
                <ChatIcon size={20} weight="bold" className='text-[#7B7C7D]' />
                <a className="text-[#7B7C7D] font-semibold">Add Remarks</a>
            </div>
            <Textarea id="content" placeholder="Give remarks when Remarking or Rejecting a post." rows={2} value={value} onChange={(e) => onChange(e.target.value)} />
        </div>
    );
};

export default AddRemarkBox;
