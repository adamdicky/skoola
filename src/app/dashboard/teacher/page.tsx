'use client';

import { useState, useEffect } from 'react';
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
import { ClockIcon, XCircleIcon, CheckCircleIcon, NotePencilIcon, NoteIcon } from "@phosphor-icons/react";

import PostList from '@/components/PostList';
import CreatePostModal from '@/components/CreatePostModal';

// Define the structure for data fetched from the API
interface PostData {
    id: number;
    title: string;
    created_at: string;
    status: 'approved' | 'pending' | 'remarked' | 'rejected';
    // Add other fields you fetch and pass to PostList if needed (e.g., post_type, content, tags, etc.)
}

interface AnalyticsData {
    total: number;
    approved: number;
    pending: number;
    remarked: number;
    rejected: number;
}


export default function TeacherDashboardPage() {

    const [filter, setFilter] = useState("all"); // status filter: all | approved | pending | remarked | rejected
    const [openFilter, setOpenFilter] = useState(false);
    const [date, setDate] = useState("latest"); // sort filter: newest | oldest
    const [openDate, setOpenDate] = useState(false);
    const [openCreatePost, setOpenCreatePost] = useState(false);

    // New State for Data
    const [posts, setPosts] = useState<PostData[]>([]);
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);

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

    // --- Data Fetching Logic ---
    const fetchTeacherPosts = async () => {
        setLoading(true);

        const params = new URLSearchParams();
        if (filter !== 'all') {
            params.append('status', filter);
        }
        if (date !== 'latest') {
            params.append('sort', date);
        }

        try {
            const res = await fetch(`/api/posts/teacher?${params.toString()}`);
            const result = await res.json();

            if (res.ok && result.data) {
                const fetchedPosts: PostData[] = result.data;
                setPosts(fetchedPosts);

                // Calculate Analytics based on the fetched data (before client-side filtering)
                const calculatedAnalytics: AnalyticsData = {
                    total: fetchedPosts.length,
                    approved: fetchedPosts.filter(p => p.status === 'approved').length,
                    pending: fetchedPosts.filter(p => p.status === 'pending').length,
                    remarked: fetchedPosts.filter(p => p.status === 'remarked').length,
                    rejected: fetchedPosts.filter(p => p.status === 'rejected').length,
                };
                setAnalytics(calculatedAnalytics);

            } else {
                // Handle API error or empty response
                setPosts([]);
                setAnalytics({ total: 0, approved: 0, pending: 0, remarked: 0, rejected: 0 });
                console.error('Failed to fetch teacher posts:', result.msg);
            }
        } catch (err) {
            console.error('Error fetching teacher posts:', err);
            setPosts([]);
            setAnalytics({ total: 0, approved: 0, pending: 0, remarked: 0, rejected: 0 });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // Fetch posts whenever the status filter or sort date changes
        fetchTeacherPosts();
    }, [filter, date]);


    // Helper function to render PostList components
    const renderPosts = () => {
        if (loading) {
            return <p className='text-[#243056] p-4 text-center'>Loading posts...</p>;
        }

        if (posts.length === 0 && filter !== 'all') {
            return <p className='text-[#243056] p-4 text-center'>No posts found with status: {filter.charAt(0).toUpperCase() + filter.slice(1)}.</p>;
        }

        if (posts.length === 0) {
            return <p className='text-[#243056] p-4 text-center'>No posts found.</p>;
        }

        return posts.map((post) => (
            <PostList
                key={post.id}
                title={post.title}
                // Format the ISO timestamp to a cleaner date string
                date={new Date(post.created_at).toLocaleDateString('en-MY', { year: 'numeric', month: 'long', day: 'numeric' })}
                // Capitalize status for the component prop
                status={post.status.charAt(0).toUpperCase() + post.status.slice(1) as any}
                showAddRemarkBox={false}
                showDelete={true}
            />
        ));
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start w-full px-4 sm:px-6 md:px-10 lg:px-20 ">

            <div className='w-full max-w-270 py-5 flex flex-col items-start gap-1'>
                <a className='text-4xl font-bold text-[#243056]'>My Posts</a>
                <a className='text-[#243056] text-justify'>Manage your posts in SMK Kuala Kurau for Class 3 Al-Farabi.</a>
            </div>

            {/* DIVIDER - Analytics Boxes (Updated with dynamic data) */}

            <div className='grid grid-cols-2 gap-3 lg:flex lg:flex-row items-center lg:justify-between w-full max-w-270 md:gap-5 '>
                <div className='flex flex-row items-center justify-center gap-3 bg-white rounded-2xl p-4 flex-1'>
                    <div className='flex flex-col'>
                        <a className='text-lg leading-none font-semibold text-[#243056]'>Total</a>
                        <a className='text-2xl leading-none font-bold text-[#243056]'>{analytics?.total ?? 0}</a>
                    </div>
                    <NoteIcon size={50} weight="fill" className='text-gray-400' />
                </div>

                <div className='flex flex-row items-center justify-center gap-3  bg-white rounded-2xl p-4 flex-1'>
                    <div className='flex flex-col'>
                        <a className='text-lg leading-none font-semibold text-[#243056]'>Approved</a>
                        <a className='text-2xl leading-none font-bold text-[#243056]'>{analytics?.approved ?? 0}</a>
                    </div>
                    <CheckCircleIcon size={50} weight="fill" className='text-green-400 ' />
                </div>

                <div className='flex flex-row items-center justify-center gap-3  bg-white rounded-2xl p-4 flex-1'>
                    <div className='flex flex-col'>
                        <a className='text-lg leading-none font-semibold text-[#243056]'>Pending</a>
                        <a className='text-2xl leading-none font-bold text-[#243056]'>{analytics?.pending ?? 0}</a>
                    </div>
                    <ClockIcon size={50} weight="fill" className='text-yellow-400' />
                </div>


                <div className='flex flex-row items-center justify-center gap-3  bg-white rounded-2xl p-4 flex-1'>
                    <div className='flex flex-col'>
                        <a className='text-lg leading-none font-semibold text-[#243056]'>Remarked</a>
                        <a className='text-2xl leading-none font-bold text-[#243056]'>{analytics?.remarked ?? 0}</a>
                    </div>
                    <NotePencilIcon size={50} weight="fill" className='text-blue-400' />
                </div>

                <div className='flex flex-row items-center justify-center gap-3  bg-white rounded-2xl p-4 flex-1'>
                    <div className='flex flex-col'>
                        <a className='text-lg leading-none font-semibold text-[#243056]'>Rejected</a>
                        <a className='text-2xl leading-none font-bold text-[#243056]'>{analytics?.rejected ?? 0}</a>
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
                    {renderPosts()}
                </div>
            </div>

            <CreatePostModal open={openCreatePost} onOpenChange={setOpenCreatePost} context='classclub' />


        </div>
    );
}