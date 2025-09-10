'use client';

import { useState } from 'react';
import React from 'react';
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { ChevronDown } from 'lucide-react';
import { PlusIcon } from 'lucide-react';
import { ClockIcon, XCircleIcon, CheckCircleIcon, NotePencilIcon, NewspaperIcon, NoteIcon } from "@phosphor-icons/react";

import PostList from '@/components/PostList';


export default function SchoolPage() {

    const [filter, setFilter] = useState("filter"); // default option
    const [openFilter, setOpenFilter] = useState(false); // for dropdown menu state
    const [openTag, setOpenTag] = useState(false); // for dropdown menu state

    const filterLabels: Record<string, string> = {
        newest: "Newest First",
        oldest: "Oldest First",
        filter: "Filter",
    };

    type Checked = DropdownMenuCheckboxItemProps["checked"]

    const [activeTab, setActiveTab] = useState('All');
    const tabs = ["Create Post", "Manage Posts"];

    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
    const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
    const [showPanel, setShowPanel] = React.useState<Checked>(false)


    return (
        <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6 md:px-10 lg:px-20">

            <div className='w-full max-w-270 py-5 flex flex-col items-start gap-1'>
                <a className='text-4xl font-bold text-[#243056]'>Manage Posts</a>
                <a className='text-[#243056] text-justify'>Manage your posts and moderate teachers' posts.</a>
            </div>

            <div className='sm:w-auto md:w-auto py-6 px-3 rounded-xl h-10 bg-white border-1 border-[#B2B8EE] flex flex-row items-center justify-center gap-3 text-xl font-semibold text-[#314073]'>
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1 rounded-2xl transition-all duration-200  ${activeTab === tab
                            ? "bg-gradient-to-b from-[#8792FF] to-[#0095FF] text-white shadow-md"
                            : "text-[#314073] hover:shadow-sm hover:cursor-pointer"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* DIVIDER */}

            {/* <div className='grid grid-cols-2 gap-3 lg:flex lg:flex-row items-center lg:justify-between w-full max-w-270 md:gap-5 '>
                <div className='flex flex-row items-center justify-center gap-3 bg-[#F5F5F5] rounded-2xl p-4 flex-1'>
                    <div className='flex flex-col'>
                        <a className='text-lg leading-none font-semibold text-[#243056]'>Total</a>
                        <a className='text-2xl leading-none font-bold text-[#243056]'>10</a>
                    </div>
                    <NoteIcon size={50} weight="fill" className='text-gray-400' />
                </div>
            </div> */}


            {/* DIVIDER */}

            <div className='w-full max-w-270 py-5 flex flex-row md:flex-row  gap-6 items-center justify-between'>
                <div className='flex flex-col md:items-start sm:items-center items-center '>
                    <Button variant="outline" className=' font-semibold text-[#314073]'>Create<PlusIcon /></Button>
                </div>
                <div className='flex flex-row items-center gap-2'>

                    {/* Filter Post by Date Dropdown */}
                    <DropdownMenu open={openFilter} onOpenChange={setOpenFilter}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className='font-semibold text-[#314073]'>
                                {filter ? filterLabels[filter] : "Filter"}
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${openFilter ? "rotate-180" : ""
                                        }`}
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
                                <DropdownMenuRadioItem value="newest">
                                    Newest First
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="oldest">
                                    Oldest First
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Post Tags Dropdown */}
                    <DropdownMenu open={openTag} onOpenChange={setOpenTag}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className='font-semibold text-[#314073]'>
                                Tags
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${openTag ? "rotate-180" : ""
                                        }`}
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuCheckboxItem
                                checked={showStatusBar}
                                onCheckedChange={setShowStatusBar}
                            >
                                Exam
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={showActivityBar}
                                onCheckedChange={setShowActivityBar}
                            >
                                Activity
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={showPanel}
                                onCheckedChange={setShowPanel}
                            >
                                Announcement
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>


                </div>
            </div>

            {/* Post Cards */}
            <div className='w-full max-w-270 pb-6'>
                <div className='w-full bg-white rounded-lg p-6 border border-[#B2B8EE] flex flex-col gap-3'>
                    <PostList title="Final Examination Schedule for Semester 2, Including All Subjects and Updated Timetable Adjustments for Students" date="12 March 2025" status="Approved" />
                    <PostList title="Math Quiz" date="14 March 2025" status="Pending" />
                    <PostList title="Important Announcement Regarding the Upcoming Parent-Teacher Meeting and Classroom Activities for the Weekt" date="15 March 2025" status="Remarked" />
                    <PostList title="English Essay" date="16 March 2025" status="Rejected" />
                    <PostList title="English Essay" date="16 March 2025" status="Rejected" />
                    <PostList title="Invitation to Participate in the Schools Cultural Festival Featuring Performances, Exhibitions, and Workshops" date="12 March 2025" status="Approved" />
                    <PostList title="Math Quiz" date="14 March 2025" status="Pending" />
                    <PostList title="Science Project" date="15 March 2025" status="Remarked" />
                    <PostList title="Invitation to Participate in the Schools Cultural Festival Featuring Performances, Exhibitions, and Workshops" date="16 March 2025" status="Rejected" />
                    <PostList title="English Essay" date="16 March 2025" status="Rejected" />

                </div>
            </div>
        </div>
    );
}
