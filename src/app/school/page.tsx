'use client'; // only if you're using App Router

import { useState } from 'react';
import { useEffect } from 'react';
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
import { NewspaperIcon } from "@phosphor-icons/react";

import PostCard from '@/components/PostCard';
import SchoolBackground from '@/components/SchoolBackground';
import { Command, CommandInput } from '@/components/ui/command';

export default function SchoolPage() {

    const [activeTab, setActiveTab] = useState('All');
    const tabs = ["All", "School", "Classes", "Clubs"];
    const [posts, setPosts] = useState([]); // to hold fetched posts
    const [loading, setLoading] = useState(false); // to manage loading state

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

    useEffect(() => {
        async function fetchPosts() {

            setLoading(true);

            const params = new URLSearchParams();
            if (activeTab !== 'All') params.append('tab', activeTab);
            if (filter !== 'filter') params.append('sort', filter);

            const selectedTags = [];
            if (showStatusBar) selectedTags.push('exam');
            if (showActivityBar) selectedTags.push('activity');
            if (showPanel) selectedTags.push('announcement');
            if (selectedTags.length > 0) params.append('tag', selectedTags.join(','));

            const res = await fetch(`/api/posts?${params.toString()}`);
            const result = await res.json();

            if (res.ok) setPosts(result.data || []);
            else console.error('Failed to fetch posts');

            setLoading(false);
        }

        fetchPosts();

    }, [activeTab, filter, showStatusBar, showActivityBar, showPanel]);

    return (
        <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6 md:px-10 lg:px-20">
            <div className="w-full max-w-170 px-5 pb-5 flex justify-center items-center m-auto">
                <Command>
                    <CommandInput placeholder="Search school..." />
                </Command>
            </div>
            <SchoolBackground />

            {/* DIVIDER */}

            <div className='py-5 flex flex-col items-center'>
                <a className='text-4xl font-bold text-[#243056]'>SMK Kuala Kurau</a>
                <a className='sm: text-center sm: px-2 text-[#243056]'>8a, Jln Pantai, Kampung Batu Empat Belas, 34350 Kuala Kurau, Perak </a>
            </div>

            {/* DIVIDER */}

            <div className='sm:w-auto md:w-auto py-6 px-3 rounded-2xl h-10 bg-white border-1 border-[#B2B8EE] flex flex-row items-center justify-center gap-6 text-xl font-semibold text-[#314073]'>
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
            <div className="w-full max-w-270 py-5 flex flex-col gap-6">
                {loading ? (
                    <p>Loading posts...</p>
                ) : posts.length > 0 ? (
                    posts.map((post: any) => <PostCard key={post.id} />)
                ) : (
                    <p>No posts found.</p>
                )}
            </div>


            {/* <PostCard />
            <PostCard />
            <PostCard /> */}
        </div>
    );
}
