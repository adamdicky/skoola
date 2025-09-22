import React from "react";
import { AccountStatus } from "./AccountStatus";
import { ChevronDown } from "lucide-react";
import { DotOutlineIcon, FloppyDiskIcon, GearSixIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";



interface PostListProps {
    displayname: string;
    created_at: string;
    accStatus: "Unlocked" | "Locked";
    role: string;
    email: string;
    assignedTo: string;
}

const UserList: React.FC<PostListProps> = ({ displayname, created_at, accStatus, role, email, assignedTo }) => {

    const [openUser, setOpenUser] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);

    const [formData, setFormData] = React.useState({
        displayname,
        created_at,
        accStatus,
        role,
        email,
        assignedTo,
    });

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const statusColorMap: Record<string, "green" | "red"> = {
        Unlocked: "green",
        Locked: "red",
    };

    return (
        <div className="rounded-lg outline-1 outline-[#9298D0] ">
            <div className="flex flex-col md:flex-row items-center justify-between bg-[#F3F4FE] px-5 py-2 rounded-lg">

                <div className="flex-1 min-w-0 flex justify-center md:justify-start">
                    <a className={`max-w-130 text-lg font-semibold text-center md:text-start text-[#243056] ${openUser
                        ? "whitespace-normal break-words"
                        : "line-clamp-2"
                        }`}>
                        {displayname}
                    </a>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 mt-2 md:mt-0 ">
                    <div className={` ${openUser ?
                        "" : "hidden"
                        }`}>
                        <Button
                            variant="ghost"
                            onClick={() => setIsEditing((prev) => !prev)}
                            className={`rounded-full font-semibold min-w-[100px] max-w-[120px] hover:cursor-pointer ${isEditing ?
                                "text-[#0095FF] bg-[#f0f8fe] border-1 border-[#0095FF] hover:text-[#0095FF] hover:bg-[#cee6f9]" : "text-gray-600 bg-white border-1 border-gray-300 "
                                }`}
                        >
                            {isEditing ? "Save" : "Edit"}
                            {isEditing ?
                                <FloppyDiskIcon /> : <GearSixIcon></GearSixIcon>
                            }


                        </Button>
                    </div>

                    {!openUser && (
                        <span className="text-[#6E7793] w-55 text-right whitespace-nowrap hidden sm:flex md:flex lg:flex">
                            {created_at}
                        </span>
                    )}


                    <DotOutlineIcon size={20} weight="bold" className={`text-[#6E7793]  ${openUser ?
                        "hidden" : "hidden md:flex lg:flex"
                        }`}
                    />

                    <span className={`text-[#6E7793] w-25 text-center whitespace-nowrap ${openUser ?
                        "hidden" : ""
                        }`} >{role}
                    </span>

                    <AccountStatus name={accStatus} color={statusColorMap[accStatus]} />

                    <Button variant="ghost" className=' text-[#314073] hover:cursor-pointer hidden md:flex lg:flex' onClick={() => setOpenUser(!openUser)}>
                        <ChevronDown
                            className={`w-5 h-5 text-[#314073] transform transition-transform duration-200 ${openUser ? "rotate-180" : ""
                                }`}
                        />
                    </Button>
                </div>

                <Button variant="ghost" className=' text-[#314073] hover:cursor-pointer md:hidden lg:hidden' onClick={() => setOpenUser(!openUser)}>
                    <ChevronDown
                        className={`w-5 h-5 text-[#314073] transform transition-transform duration-200 ${openUser ? "rotate-180" : ""
                            }`}
                    />
                </Button>

            </div>

            {
                openUser && (
                    <div className="bg-[#F3F4FE]">
                        <div className="px-5 pb-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-5">
                                {/* Display Name */}
                                <div className="flex flex-col space-y-2">
                                    <Label
                                        htmlFor="displayname"
                                        className={`font-semibold ${isEditing ?
                                            "text-[#314073]" : "text-[#7B7C7D]"
                                            }`}
                                    >
                                        Display Name
                                    </Label>
                                    <Input
                                        id="displayname"
                                        value={formData.displayname}
                                        disabled={!isEditing}
                                        onChange={(e) => handleChange("displayname", e.target.value)}
                                        className="bg-white"
                                    />
                                </div>

                                {/* Role */}
                                <div className="flex flex-col space-y-2">
                                    <Label
                                        htmlFor="role"
                                        className={`font-semibold ${isEditing ?
                                            "text-[#314073]" : "text-[#7B7C7D]"
                                            }`}
                                    >Role
                                    </Label>
                                    <Select
                                        disabled={!isEditing}
                                        value={formData.role}
                                        onValueChange={(value) => handleChange("role", value)}
                                    >
                                        <SelectTrigger className="bg-white w-full">
                                            <SelectValue placeholder="Select role. hellowejrqweior" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Teacher">Teacher</SelectItem>
                                            <SelectItem value="Admin">Admin</SelectItem>
                                            <SelectItem value="Student">Student</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Email */}
                                <div className="flex flex-col space-y-2">
                                    <Label
                                        htmlFor="email"
                                        className={`font-semibold ${isEditing ?
                                            "text-[#314073]" : "text-[#7B7C7D]"
                                            }`}
                                    >Email
                                    </Label>
                                    <Input
                                        id="email"
                                        value={formData.email}
                                        disabled={!isEditing}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                        className="bg-white"
                                    />
                                </div>

                                {/* Assigned To */}
                                <div className="flex flex-col space-y-2">
                                    <Label
                                        htmlFor="assignedTo"
                                        className={`font-semibold ${isEditing ?
                                            "text-[#314073]" : "text-[#7B7C7D]"
                                            }`}
                                    >Assigned To
                                    </Label>
                                    <Select
                                        disabled={!isEditing}
                                        value={formData.assignedTo}
                                        onValueChange={(value) => handleChange("assignedTo", value)}
                                    >
                                        <SelectTrigger className="bg-white w-full">
                                            <SelectValue placeholder="Select class or club." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Teacher">Musical Club</SelectItem>
                                            <SelectItem value="Admin">Pantun Club</SelectItem>
                                            <SelectItem value="Student">6 Cekal</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>



                            <hr className="border-t border-gray-400" />
                            <a className="font-small text-[#6E7793] pt-3 block italic">Created at 12 March 2025</a>
                        </div>
                    </div>
                )
            }

        </div>

    );
};

export default UserList;

