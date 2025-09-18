'use client';

import { useState } from 'react';
import React from 'react';
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Upload } from 'lucide-react';
import { PlusIcon } from 'lucide-react';
import { ClockIcon, XCircleIcon, CheckCircleIcon, NotePencilIcon, UploadSimpleIcon, NoteIcon } from "@phosphor-icons/react";

import PostList from '@/components/PostList';
import CreatePostDialog from '@/components/CreatePostModal';


export default function TeacherDashboardPage() {

    const [filter, setFilter] = useState("all"); // default option
    const [openFilter, setOpenFilter] = useState(false); // for dropdown status state

    const [date, setDate] = useState("latest"); // default option
    const [openDate, setOpenDate] = useState(false); // for dropdown date state

    const [openCreatePost, setOpenCreatePost] = useState(false); // for create post modal

    const filterLabels: Record<string, string> = {
        approved: "Status: Approved",
        pending: "Status: Pending",
        remarked: "Status: Remarked",
        rejected: "Status: Rejected",
        all: "Status: All",
    };

    const filterDateLabels: Record<string, string> = {
        latest: "Date: Latest",
        oldest: "Date: Oldest",
    };


    return (
        <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6 md:px-10 lg:px-20">

            <div className='w-full max-w-270 py-5 flex flex-col items-start gap-1'>
                <a className='text-4xl font-bold text-[#243056]'>My Posts</a>
                <a className='text-[#243056] text-justify'>Manage your posts in SMK Kuala Kurau for Class 3 Al-Farabi.</a>
            </div>

            {/* DIVIDER */}

            <div className='grid grid-cols-2 gap-3 lg:flex lg:flex-row items-center lg:justify-between w-full max-w-270 md:gap-5 '>
                <div className='flex flex-row items-center justify-center gap-3 bg-white rounded-2xl p-4 flex-1'>
                    <div className='flex flex-col'>
                        <a className='text-lg leading-none font-semibold text-[#243056]'>Total</a>
                        <a className='text-2xl leading-none font-bold text-[#243056]'>10</a>
                    </div>
                    <NoteIcon size={50} weight="fill" className='text-gray-400' />
                </div>

                <div className='flex flex-row items-center justify-center gap-3  bg-white rounded-2xl p-4 flex-1'>
                    <div className='flex flex-col'>
                        <a className='text-lg leading-none font-semibold text-[#243056]'>Approved</a>
                        <a className='text-2xl leading-none font-bold text-[#243056]'>5</a>
                    </div>
                    <CheckCircleIcon size={50} weight="fill" className='text-green-400 ' />
                </div>

                <div className='flex flex-row items-center justify-center gap-3  bg-white rounded-2xl p-4 flex-1'>
                    <div className='flex flex-col'>
                        <a className='text-lg leading-none font-semibold text-[#243056]'>Pending</a>
                        <a className='text-2xl leading-none font-bold text-[#243056]'>3</a>
                    </div>
                    <ClockIcon size={50} weight="fill" className='text-yellow-400' />
                </div>


                <div className='flex flex-row items-center justify-center gap-3  bg-white rounded-2xl p-4 flex-1'>
                    <div className='flex flex-col'>
                        <a className='text-lg leading-none font-semibold text-[#243056]'>Remarked</a>
                        <a className='text-2xl leading-none font-bold text-[#243056]'>2</a>
                    </div>
                    <NotePencilIcon size={50} weight="fill" className='text-blue-400' />
                </div>

                <div className='flex flex-row items-center justify-center gap-3  bg-white rounded-2xl p-4 flex-1'>
                    <div className='flex flex-col'>
                        <a className='text-lg leading-none font-semibold text-[#243056]'>Rejected</a>
                        <a className='text-2xl leading-none font-bold text-[#243056]'>0</a>
                    </div>
                    <XCircleIcon size={50} weight="fill" className='text-red-400' />
                </div>

            </div>


            {/* DIVIDER */}

            <div className='w-full max-w-270 py-5 flex flex-row md:flex-row  gap-6 items-center justify-between'>
                <div className='flex flex-col md:items-start sm:items-center items-center '>
                    <Button variant="outline" className=' font-semibold text-[#314073] hover:cursor-pointer' onClick={() => setOpenCreatePost(true)}>Create<PlusIcon /></Button>
                </div>
                <div className='flex flex-row items-center gap-2'>

                    {/* Filter Post by Status */}

                    <DropdownMenu open={openFilter} onOpenChange={setOpenFilter}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className='font-semibold text-[#314073] hover:cursor-pointer'>
                                {filter ? filterLabels[filter] : "Status"}
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${openFilter ? "rotate-180" : ""
                                        }`}
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
                                <DropdownMenuRadioItem value="all">
                                    All
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="approved">
                                    Approved
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="pending">
                                    Pending
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="remarked">
                                    Remarked
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="rejected">
                                    Rejected
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Post Date Dropdown */}
                    <DropdownMenu open={openDate} onOpenChange={setOpenDate}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className='font-semibold text-[#314073] hover:cursor-pointer'>
                                {date ? filterDateLabels[date] : "Date"}
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${openDate ? "rotate-180" : ""
                                        }`}
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuRadioGroup value={date} onValueChange={setDate}>
                                <DropdownMenuRadioItem value="latest">
                                    Latest
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="oldest">
                                    Oldest
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>

            {/* Post Cards */}
            <div className='w-full max-w-270 pb-6'>
                <div className='w-full bg-white rounded-lg p-6 border border-[#B2B8EE] flex flex-col gap-3'>
                    <PostList title="Final Examination Schedule for Semester 2, Including All Subjects and Updated Timetable Adjustments for Students" date="12 March 2025" status="Approved" showAddRemarkBox={false} />
                    {/* <PostList title="Math Quiz" date="14 March 2025" status="Pending" />
                    <PostList title="Important Announcement Regarding the Upcoming Parent-Teacher Meeting and Classroom Activities for the Weekt" date="15 March 2025" status="Remarked" />
                    <PostList title="English Essay" date="16 March 2025" status="Rejected" />
                    <PostList title="English Essay" date="16 March 2025" status="Rejected" />
                    <PostList title="Invitation to Participate in the Schools Cultural Festival Featuring Performances, Exhibitions, and Workshops" date="12 March 2025" status="Approved" />
                    <PostList title="Math Quiz" date="14 March 2025" status="Pending" />
                    <PostList title="Science Project" date="15 March 2025" status="Remarked" />
                    <PostList title="Invitation to Participate in the Schools Cultural Festival Featuring Performances, Exhibitions, and Workshops" date="16 March 2025" status="Rejected" />
                    <PostList title="English Essay" date="16 March 2025" status="Rejected" /> */}

                </div>
            </div>

            <CreatePostDialog open={openCreatePost} onOpenChange={setOpenCreatePost} />


        </div>
    );
}
