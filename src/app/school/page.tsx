'use client'; // only if you're using App Router

import { useState } from 'react';
import Image from 'next/image';
import React from 'react';
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"


import { ChevronDown } from 'lucide-react';


export default function SchoolPage() {

    const [activeTab, setActiveTab] = useState('All');
    const tabs = ["All", "School", "Classes", "Clubs"];

    const [filter, setFilter] = useState("newest"); // default option
    const [openFilter, setOpenFilter] = useState(false); // for dropdown menu state
    const [openTag, setOpenTag] = useState(false); // for dropdown menu state

    const filterLabels: Record<string, string> = {
        newest: "Newest First",
        oldest: "Oldest First",
    };

    type Checked = DropdownMenuCheckboxItemProps["checked"]

    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
    const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
    const [showPanel, setShowPanel] = React.useState<Checked>(false)


    return (
        <div className="flex flex-col items-center justify-center">
            <div className='relative w-300 aspect-[9/2]'>
                <Image
                    src="/schoolpic2.jpg"
                    alt="School Image"
                    fill
                    className="object-cover"
                />

                <div className='absolute inset-0 flex items-center justify-center'>
                    <Image
                        src="/schoollogo.png"
                        alt="School Logo"
                        width={200}
                        height={200}

                    />
                </div>
            </div>

            {/* DIVIDER */}

            <div className='py-5 flex flex-col items-center'>
                <a className='text-4xl font-bold text-[#243056]'>SMK Kuala Kurau</a>
                <a className='sm: text-center sm: px-2'>8a, Jln Pantai, Kampung Batu Empat Belas, 34350 Kuala Kurau, Perak </a>
            </div>

            {/* DIVIDER */}

            <div className='sm:w-auto md:w-auto py-6 px-4 rounded-2xl h-10 bg-white flex flex-row items-center justify-center gap-6 text-xl font-semibold text-[#314073]'>
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1 rounded-2xl transition-all duration-200 ${activeTab === tab
                            ? "bg-gradient-to-b from-[#8792FF] to-[#0095FF] text-white shadow-md"
                            : "text-[#314073] hover:shadow-sm hover:cursor-pointer"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* DIVIDER */}

            <div className='md:w-300 py-5 flex flex-col md:flex-row gap-6 items-center justify-between'>
                <div className='flex flex-col md:items-start sm:items-center items-center'>
                    <a className='text-2xl font-bold text-[#243056]'>Recent Updates</a>
                    <a className='text-[#243056]'>3 updates since last week.</a>
                </div>
                <div className='flex flex-row items-center gap-2'>

                    {/* Filter Post by Date Dropdown */}
                    <DropdownMenu open={openFilter} onOpenChange={setOpenFilter}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className='font-semibold'>
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
                            <Button variant="outline" className='font-semibold'>
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
            <div className=''>
                <div className='md:w-300 sm:w-150  flex flex-col items-center justify-center gap-4 pb-5'>
                    <div className='w-full h-auto bg-white rounded-lg shadow-md p-4'>
                        <h3 className='text-xl font-semibold text-[#243056]'>Exam Results</h3>
                        <p className='text-[#314073]'>Check your exam results for the latest semester.</p>
                    </div>
                    <div className='w-full h-auto bg-white rounded-lg shadow-md p-4'>
                        <h3 className='text-xl font-semibold text-[#243056]'>Sports Day</h3>
                        <p className='text-[#314073]'>Join us for the annual sports day event!</p>
                    </div>
                    <div className='w-full h-auto bg-white rounded-lg shadow-md p-4'>
                        <h3 className='text-xl font-semibold text-[#243056]'>Sports Day</h3>
                        <p className='text-[#314073]'>Join us for the annual sports day event!</p>
                    </div>
                </div>
            </div>


        </div>
    );
}
