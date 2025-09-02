'use client'; // only if you're using App Router

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
import { ClockIcon, XCircleIcon, CheckCircleIcon, NotePencilIcon, NewspaperIcon, NoteIcon } from "@phosphor-icons/react";

import PostCard from '@/components/PostCard';


export default function SchoolPage() {

    const [activeTab, setActiveTab] = useState('All');
    const tabs = ["All", "School", "Classes", "Clubs"];

    const [filter, setFilter] = useState("filter"); // default option
    const [openFilter, setOpenFilter] = useState(false); // for dropdown menu state
    const [openTag, setOpenTag] = useState(false); // for dropdown menu state

    const filterLabels: Record<string, string> = {
        newest: "Newest First",
        oldest: "Oldest First",
        filter: "Filter",
    };

    type Checked = DropdownMenuCheckboxItemProps["checked"]

    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
    const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
    const [showPanel, setShowPanel] = React.useState<Checked>(false)


    return (
        <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6 md:px-10 lg:px-20">

            <div className='w-full max-w-270 py-5 flex flex-col items-start'>
                <a className='text-4xl font-bold text-[#243056]'>My Posts</a>
                <a className='text-[#243056] text-justify'>Manage your posts in SMK Kuala Kurau for Class 3 Al-Farabi.</a>
            </div>

            {/* DIVIDER */}

            <div className='flex flex-row items-center justify-between w-full max-w-270'>
                <div className='flex flex-row items-center gap-3 bg-[#F5F5F5] rounded-2xl p-4'>
                    <div className='flex flex-col'>
                        <a className='text-lg leading-none font-semibold text-[#243056]'>Total Posts</a>
                        <a className='text-2xl leading-none font-bold text-[#243056]'>3</a>
                    </div>
                    <NoteIcon size={50} weight="fill" className='text-[#B2B8EE] stroke-6 stroke-[#6D76D5]' />
                </div>

                <div className='flex flex-row items-center gap-3 bg-[#F5F5F5] rounded-2xl p-4'>
                    <div className='flex flex-col'>
                        <a className='text-lg leading-none font-semibold text-[#243056]'>Approved</a>
                        <a className='text-2xl leading-none font-bold text-[#243056]'>3</a>
                    </div>
                    <CheckCircleIcon size={50} weight="fill" className='text-[#84E492] stroke-6 stroke-[#28A93B]' />
                </div>

                <div className='flex flex-row items-center gap-3 bg-[#F5F5F5] rounded-2xl p-4'>
                    <div className='flex flex-col'>
                        <a className='text-lg leading-none font-semibold text-[#243056]'>Pending</a>
                        <a className='text-2xl leading-none font-bold text-[#243056]'>3</a>
                    </div>
                    <ClockIcon size={50} weight="fill" className='text-[#FFF36D] stroke-6 stroke-[#8F833D]' />
                </div>


                <div className='flex flex-row items-center gap-3 bg-[#F5F5F5] rounded-2xl p-4'>
                    <div className='flex flex-col'>
                        <a className='text-lg leading-none font-semibold text-[#243056]'>Remarked</a>
                        <a className='text-2xl leading-none font-bold text-[#243056]'>3</a>
                    </div>
                    <NotePencilIcon size={50} weight="fill" className='text-[#243056]' />
                </div>

                <div className='flex flex-row items-center gap-3 bg-[#F5F5F5] rounded-2xl p-4'>
                    <div className='flex flex-col'>
                        <a className='text-lg leading-none font-semibold text-[#243056]'>Rejected</a>
                        <a className='text-2xl leading-none font-bold text-[#243056]'>3</a>
                    </div>
                    <XCircleIcon size={50} weight="fill" className='text-[#243056]' />
                </div>

            </div>


            {/* DIVIDER */}

            <div className='w-full max-w-270 py-5 flex flex-col md:flex-row gap-6 items-center justify-between'>
                <div className='flex flex-col md:items-start sm:items-center items-center '>
                    <a className='text-2xl font-bold text-[#243056]'>Recent Updates</a>
                    <div className='flex flex-row items-center gap-2'>
                        <NewspaperIcon size={30} color="#B8FFC3" weight='fill' className='stroke-4 stroke-[#00A719]' />
                        <a className='text-[#243056]'>3 updates since last week.</a>
                    </div>

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
            <PostCard />
            <PostCard />
            <PostCard />
        </div>
    );
}
