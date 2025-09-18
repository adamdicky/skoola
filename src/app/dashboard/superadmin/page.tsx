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
import Link from "next/link";

import { ArrowRight, ChevronDown } from 'lucide-react';
import { CheckCircleIcon, ClockIcon, NoteIcon, NotePencilIcon, XCircleIcon } from '@phosphor-icons/react';

import PostList from '@/components/PostList';



export default function ManagePostPage() {

    const [filter, setFilter] = useState("all"); // default option
    const [openFilter, setOpenFilter] = useState(false); // for dropdown status state

    const [date, setDate] = useState("latest"); // default option
    const [openDate, setOpenDate] = useState(false); // for dropdown date state

    const [type, setType] = useState("all"); // default option
    const [openType, setOpenType] = useState(false); // for dropdown type state

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

    const filterTypeLabels: Record<string, string> = {
        all: " Post Type: All",
        clubs: "Post Type: Clubs",
        classes: "Post Type: Classes",
        admins: "Post Type: Admins",
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start w-full px-4 sm:px-6 md:px-10 lg:px-20">

            <div className='w-full max-w-270 flex flex-row justify-between items-center'>
                <div className='w-full max-w-270 py-5 flex flex-col items-start gap-1'>
                    <a className='text-4xl font-bold text-[#243056]'>School Posts</a>
                    <a className='text-[#243056] text-left'>Manage posts from clubs, classes and Admins in SMK Kuala Kurau.</a>
                </div>
                <div className='w-full max-w-270  flex flex-col items-end gap-1'>
                    <Link
                        href="/dashboard/superadmin/manage-school"
                        className="group inline-flex items-center gap-2 text-xl font-bold text-[#243056] hover:text-[#4a5aa0] transition-colors"
                    >
                        <span className="underline text-right">Go to Manage School</span>
                        <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="/dashboard/superadmin/manage-users"
                        className="group inline-flex items-center gap-2 text-xl font-bold text-[#243056] hover:text-[#4a5aa0] transition-colors"
                    >
                        <span className="underline text-right">Go to Manage Users</span>
                        <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

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

            <div className='w-full max-w-270 py-5 flex flex-row md:flex-row  gap-6 items-center justify-center md:justify-end'>
                <div className='flex flex-row items-center gap-2'>
                    {/* Filter Post by Type */}
                    <DropdownMenu open={openType} onOpenChange={setOpenType}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className='font-semibold text-[#314073] hover:cursor-pointer'>
                                {type ? filterTypeLabels[type] : "Status"}
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${openType ? "rotate-180" : ""
                                        }`}
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuRadioGroup value={type} onValueChange={setType}>
                                <DropdownMenuRadioItem value="all">
                                    All
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="admins">
                                    Admins
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="clubs">
                                    Clubs
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="classes">
                                    Classes
                                </DropdownMenuRadioItem>

                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

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
                    <PostList title="Final Examination Schedule for Semester 2, Including All Subjects and Updated Timetable Adjustments for Students" date="12 March 2025" status="Approved" showStatus={true} postType='Hockey Club' showDelete={false} useActionModal={true} />
                    <PostList title="Math Quiz" date="14 March 2025" status="Pending" showStatus={true} postType='Admin: Puan Rosnah' showDelete={false} useActionModal={true} />
                    {/* <PostList title="Important Announcement Regarding the Upcoming Parent-Teacher Meeting and Classroom Activities for the Weekt" date="15 March 2025" status="Remarked" showStatus={true} postType='4 CQalyubi' showDelete={false} />
                    <PostList title="English Essay" date="16 March 2025" status="Rejected" showStatus={true} postType='Climbing Club' showDelete={false} />
                    <PostList title="English Essay" date="16 March 2025" status="Rejected" showStatus={true} postType='1 Al Dinawari' />
                    <PostList title="Invitation to Participate in the Schools Cultural Festival Featuring Performances, Exhibitions, and Workshops" date="12 March 2025" status="Approved" showStatus={true} postType='5 Al Farabi' showDelete={false} />
                    <PostList title="Math Quiz" date="14 March 2025" status="Pending" showStatus={true} postType='Pantun Club' showDelete={false} />
                    <PostList title="Science Project" date="15 March 2025" status="Remarked" showStatus={true} postType='3 Al Farabi' showDelete={false} />
                    <PostList title="Invitation to Participate in the Schools Cultural Festival Featuring Performances, Exhibitions, and Workshops" date="16 March 2025" status="Rejected" showStatus={true} postType='3 Al Farabibibibibibibibibibibibibibi' showDelete={false} />
                    <PostList title="English Essay" date="16 March 2025" status="Rejected" showStatus={true} postType='Drama Club' showDelete={false} /> */}

                </div>
            </div>
        </div>
    );
}
