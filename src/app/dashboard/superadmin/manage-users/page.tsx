'use client';

import { useState } from 'react';
import React from 'react';
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from "next/link";

import { ArrowLeft, ChevronDown, PlusIcon } from 'lucide-react';
import { LockKeyIcon, LockKeyOpenIcon, UserGearIcon, NotePencilIcon, ChalkboardTeacherIcon, UsersThreeIcon } from '@phosphor-icons/react';

import UserList from '@/components/UserList';
import CreateUserModal from '@/components/CreateUserModal';

type Checked = DropdownMenuCheckboxItemProps["checked"]

export default function ManageUsersPage() {

    const [openFilter, setOpenFilter] = useState(false); // for dropdown status state

    // Role 
    const [showSuperAdminBar, setShowSuperAdminBar] = React.useState<Checked>(true)
    const [showAdminBar, setShowAdminBar] = React.useState<Checked>(true)
    const [showTeacherBar, setShowTeacherBar] = React.useState<Checked>(true)

    // Account Status
    const [showLockedBar, setShowLockedAdminBar] = React.useState<Checked>(true)
    const [showUnlockedBar, setShowUnlockedAdminBar] = React.useState<Checked>(true)

    // Latest/Oldest Account Creation Date
    const [showLatestDateBar, setShowLatestDateBar] = React.useState<Checked>(false)
    const [showOldestDateBar, setShowOldestDateBar] = React.useState<Checked>(false)


    const [openCreatePost, setOpenCreatePost] = useState(false); // for create post modal

    return (
        <div className="min-h-screen flex flex-col items-center justify-start w-full px-4 sm:px-6 md:px-10 lg:px-20">

            <div className='w-full max-w-270 flex flex-col justify-between items-center'>
                <div className='w-full max-w-270 py-3 flex flex-col items-start gap-1'>
                    <Link
                        href="/dashboard/superadmin/"
                        className="group inline-flex items-center gap-2 text-xl font-bold text-[#243056] hover:text-[#4a5aa0] transition-colors"
                    >
                        <ArrowLeft className="w-6 transform group-hover:-translate-x-1 transition-transform" />
                        <span className="underline text-left leading-0">Go back to School Posts</span>

                    </Link>
                </div>
                <div className='w-full max-w-270 pb-5 flex flex-col items-start gap-1'>
                    <a className='text-4xl font-bold text-[#243056]'>Manage Users</a>
                    <a className='text-[#243056] text-left'>Manage users in SMK Kuala Kurau.</a>
                </div>
            </div>

            <div className='grid grid-cols-2 gap-3 lg:flex lg:flex-row items-center lg:justify-between w-full max-w-270 md:gap-5 '>
                <div className='flex flex-row items-center justify-center gap-3 bg-white rounded-2xl p-4 flex-1'>
                    <div className='flex flex-col'>
                        <a className='text-lg leading-none font-semibold text-[#243056]'>Total</a>
                        <a className='text-2xl leading-none font-bold text-[#243056]'>10</a>
                    </div>
                    <UsersThreeIcon size={50} weight="fill" className='text-gray-400' />
                </div>

                <div className='flex flex-row items-center justify-center gap-3  bg-white rounded-2xl p-4 flex-1'>
                    <div className='flex flex-col'>
                        <a className='text-lg leading-none font-semibold text-[#243056]'>Active</a>
                        <a className='text-2xl leading-none font-bold text-[#243056]'>5</a>
                    </div>
                    <LockKeyOpenIcon size={50} weight="fill" className='text-green-400 ' />
                </div>

                <div className='flex flex-row items-center justify-center gap-3  bg-white rounded-2xl p-4 flex-1'>
                    <div className='flex flex-col'>
                        <a className='text-lg leading-none font-semibold text-[#243056]'>Locked</a>
                        <a className='text-2xl leading-none font-bold text-[#243056]'>5</a>
                    </div>
                    <LockKeyIcon size={50} weight="fill" className='text-red-400' />
                </div>

                <div className='flex flex-row items-center justify-center gap-3  bg-white rounded-2xl p-4 flex-1'>
                    <div className='flex flex-col'>
                        <a className='text-lg leading-none font-semibold text-[#243056]'>Admins</a>
                        <a className='text-2xl leading-none font-bold text-[#243056]'>3</a>
                    </div>
                    <UserGearIcon size={50} weight="fill" className='text-yellow-400' />
                </div>


                <div className='flex flex-row items-center justify-center gap-3  bg-white rounded-2xl p-4 flex-1'>
                    <div className='flex flex-col'>
                        <a className='text-lg leading-none font-semibold text-[#243056]'>Teachers</a>
                        <a className='text-2xl leading-none font-bold text-[#243056]'>2</a>
                    </div>
                    <ChalkboardTeacherIcon size={50} weight="fill" className='text-blue-400' />
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
                            <Button variant="outline" className=' font-semibold text-[#314073] hover:cursor-pointer'>
                                Filter
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${openFilter ? "rotate-180" : ""
                                        }`}
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">

                            {/* Roles */}
                            <DropdownMenuLabel className='flex flex-row items-center justify-center gap-3 font-semibold'>
                                Roles


                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem
                                checked={showSuperAdminBar}
                                onCheckedChange={setShowSuperAdminBar}
                            >
                                Super Admin(s)
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={showAdminBar}
                                onCheckedChange={setShowAdminBar}
                            >
                                Admin(s)
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={showTeacherBar}
                                onCheckedChange={setShowTeacherBar}
                            >
                                Teachers
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuSeparator />

                            {/* Account Status */}
                            <DropdownMenuLabel className='flex flex-row items-center justify-center gap-3 font-semibold'>
                                Account Status

                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem
                                checked={showUnlockedBar}
                                onCheckedChange={setShowUnlockedAdminBar}
                            >
                                Unlocked
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={showLockedBar}
                                onCheckedChange={setShowLockedAdminBar}
                            >
                                Locked
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuSeparator />

                            {/* Latest/Oldest Account Creation Date */}
                            <DropdownMenuLabel className='flex flex-row items-center justify-center gap-3 font-semibold'>
                                Account Creation Date


                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem
                                checked={showLatestDateBar}
                                onCheckedChange={setShowLatestDateBar}
                            >
                                Latest
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={showOldestDateBar}
                                onCheckedChange={setShowOldestDateBar}
                            >
                                Oldest
                            </DropdownMenuCheckboxItem>


                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Post Cards */}
            <div className='w-full max-w-270 pb-6'>
                <div className='w-full bg-white rounded-lg p-6 border border-[#B2B8EE] flex flex-col gap-3'>
                    <UserList displayname="SMK Kuala Kurau (me)" created_at="Created at 12 March 2025" accStatus="Unlocked" role="Super Admin" email='smkkualakurau@gmail.com' assignedTo='SMK Kuala Kurau' />
                    <UserList displayname="Admin: Ms. Siti" created_at="Created at 8 April 2025" accStatus="Unlocked" role="Admin" email='mssiti2937@gmail.com' assignedTo='SMK Kuala Kurau' />
                    <UserList displayname="Cikgu Hasnul" created_at="Created at 10 April 2025" accStatus="Unlocked" role="Teacher" email='hasnul91273@gmail.com' assignedTo='6 Cekal' />
                    <UserList displayname="Cikgu Ahmad" created_at="Created at 1 June 2025" accStatus="Locked" role="Admin" email='ahmad91704@gmail.com' assignedTo='SMK Kuala Kurau' />

                    {/* <PostList title="Math Quiz" date="14 March 2025" status="Pending" showStatus={true} postType='3 Al Farabi' showDelete={false} />
                    <PostList title="Important Announcement Regarding the Upcoming Parent-Teacher Meeting and Classroom Activities for the Weekt" date="15 March 2025" status="Remarked" showStatus={true} postType='4 CQalyubi' showDelete={false} />
                    <PostList title="English Essay" date="16 March 2025" status="Rejected" showStatus={true} postType='Climbing Club' showDelete={false} />
                    <PostList title="English Essay" date="16 March 2025" status="Rejected" showStatus={true} postType='1 Al Dinawari' />
                    <PostList title="Invitation to Participate in the Schools Cultural Festival Featuring Performances, Exhibitions, and Workshops" date="12 March 2025" status="Approved" showStatus={true} postType='5 Al Farabi' showDelete={false} />
                    <PostList title="Math Quiz" date="14 March 2025" status="Pending" showStatus={true} postType='Pantun Club' showDelete={false} />
                    <PostList title="Science Project" date="15 March 2025" status="Remarked" showStatus={true} postType='3 Al Farabi' showDelete={false} />
                    <PostList title="Invitation to Participate in the Schools Cultural Festival Featuring Performances, Exhibitions, and Workshops" date="16 March 2025" status="Rejected" showStatus={true} postType='3 Al Farabibibibibibibibibibibibibibi' showDelete={false} />
                    <PostList title="English Essay" date="16 March 2025" status="Rejected" showStatus={true} postType='Drama Club' showDelete={false} /> */}

                </div>
            </div>

            <CreateUserModal open={openCreatePost} onOpenChange={setOpenCreatePost} />

        </div>
    );
}
