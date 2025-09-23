'use client';

import React from 'react';
import { Button } from "@/components/ui/button"

import Link from "next/link";

import { ArrowLeft, ChevronDown } from 'lucide-react';
import { FloppyDiskIcon, GearSixIcon } from '@phosphor-icons/react';

import SchoolBackground from '@/components/SchoolBackground';
import { AccountStatus } from '@/components/AccountStatus';


export default function ManageSchoolPage() {

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
                <div className='w-full max-w-270 pb-0 flex flex-col items-start gap-1'>
                    <a className='text-4xl font-bold text-[#243056]'>Manage School</a>
                    <a className='text-[#243056] text-left'>Change background for school, manage clubs and classes or request for school information change.</a>
                </div>
            </div>

            <div className='py-5'>
                <SchoolBackground />
            </div>

            {/* DIVIDER */}

            <div className='w-full max-w-270 pb-6'>
                <div className='w-full bg-white rounded-lg p-6 border border-[#B2B8EE] flex flex-col gap-3'>


                    {/* HERE */}
                    <div className="rounded-lg outline-1 outline-[#9298D0] ">
                        <div className="flex flex-col md:flex-row items-center justify-between bg-[#F3F4FE] px-5 py-2 rounded-lg">

                            <div className="flex-1 min-w-0 flex justify-center md:justify-start">
                                <a >
                                    Test
                                </a>
                            </div>

                            <div>
                                <Button
                                    variant="ghost"                                    >
                                    <GearSixIcon></GearSixIcon>



                                </Button>
                            </div>






                            <Button variant="ghost" className=' text-[#314073] hover:cursor-pointer hidden md:flex lg:flex' onClick={() => setOpenUser(!openUser)}>
                                <ChevronDown

                                />
                            </Button>
                        </div>

                        <Button variant="ghost" className=' text-[#314073] hover:cursor-pointer md:hidden lg:hidden' onClick={() => setOpenUser(!openUser)}>
                            <ChevronDown

                            />
                        </Button>

                    </div>

                    {/* HERE */}


                </div>
            </div>
        </div>
    );
}
