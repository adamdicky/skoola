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
import { ChevronDown } from 'lucide-react';
import { PlusIcon } from 'lucide-react';

import PostList from '@/components/PostList';
import { CheckCircleIcon, NoteIcon } from '@phosphor-icons/react';
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CreatePostModal from '@/components/CreatePostModal';


export default function AdminDashboardPage() {

    const [openCreatePost, setOpenCreatePost] = useState(false);

    const [date, setDate] = useState("latest"); // default option
    const [openDate, setOpenDate] = useState(false); // for dropdown date state

    const filterDateLabels: Record<string, string> = {
        latest: "Date: Latest",
        oldest: "Date: Oldest",
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start w-full px-4 sm:px-6 md:px-10 lg:px-20">

            <div className='w-full max-w-270 flex flex-row justify-between items-center'>
                <div className='w-full max-w-270 py-5 flex flex-col items-start gap-1'>
                    <a className='text-4xl font-bold text-[#243056]'>My Posts</a>
                    <a className='text-[#243056] text-left'>Manage your posts in SMK Kuala Kurau.</a>
                </div>
                <div className='w-full max-w-270  flex flex-col items-end gap-1'>
                    <Link
                        href="/dashboard/admin/manage-posts"
                        className="group inline-flex items-center gap-2 text-xl font-bold text-[#243056] hover:text-[#4a5aa0] transition-colors"
                    >
                        <span className="underline text-right">Go to Manage Posts</span>
                        <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            <div className='grid grid-cols-2 gap-3 lg:flex lg:flex-row items-center lg:justify-between w-full max-w-270 md:gap-5 '>
                <div className='flex flex-row items-center justify-center gap-3 bg-white rounded-2xl p-4 flex-1'>
                    <div className='flex flex-col'>
                        <a className='text-lg leading-none font-semibold text-[#243056]'>Total Posts (All Time)</a>
                        <a className='text-2xl leading-none font-bold text-[#243056]'>10</a>
                    </div>
                    <NoteIcon size={50} weight="fill" className='text-gray-400' />
                </div>

                <div className='flex flex-row items-center justify-center gap-3  bg-white rounded-2xl p-4 flex-1'>
                    <div className='flex flex-col'>
                        <a className='text-lg leading-none font-semibold text-[#243056]'>Posts This Month</a>
                        <a className='text-2xl leading-none font-bold text-[#243056]'>5</a>
                    </div>
                    <CheckCircleIcon size={50} weight="fill" className='text-green-400 ' />
                </div>

            </div>

            {/* DIVIDER */}

            <div className='w-full max-w-270 py-5 flex flex-row md:flex-row  gap-6 items-center justify-between'>
                <div className='flex flex-col md:items-start sm:items-center items-center '>
                    <Button variant="outline" className=' font-semibold text-[#314073] hover:cursor-pointer' onClick={() => setOpenCreatePost(true)}>Create<PlusIcon /></Button>
                </div>
                <div className='flex flex-row items-center gap-2'>


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
                    <PostList title="Final Examination Schedule for Semester 2, Including All Subjects and Updated Timetable Adjustments for Students" date="12 March 2025" status="Approved" showStatus={false} showDot={false} showAddRemarkBox={false} />
                    {/* <PostList title="Math Quiz" date="14 March 2025" status="Pending" showStatus={false} showDot={false} />
                    <PostList title="Important Announcement Regarding the Upcoming Parent-Teacher Meeting and Classroom Activities for the Weekt" date="15 March 2025" status="Remarked" showStatus={false} showDot={false} />
                    <PostList title="English Essay" date="16 March 2025" status="Rejected" showStatus={false} showDot={false} />
                    <PostList title="English Essay" date="16 March 2025" status="Rejected" showStatus={false} showDot={false} />
                    <PostList title="Invitation to Participate in the Schools Cultural Festival Featuring Performances, Exhibitions, and Workshops" date="12 March 2025" status="Approved" showStatus={false} showDot={false} />
                    <PostList title="Math Quiz" date="14 March 2025" status="Pending" showStatus={false} showDot={false} />
                    <PostList title="Science Project" date="15 March 2025" status="Remarked" showStatus={false} showDot={false} />
                    <PostList title="Invitation to Participate in the Schools Cultural Festival Featuring Performances, Exhibitions, and Workshops" date="16 March 2025" status="Rejected" showStatus={false} showDot={false} />
                    <PostList title="English Essay" date="16 March 2025" status="Rejected" showStatus={false} showDot={false} /> */}

                </div>
            </div>

            <CreatePostModal open={openCreatePost} onOpenChange={setOpenCreatePost} context='school' />
        </div>
    );
}
