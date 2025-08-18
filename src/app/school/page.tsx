'use client'; // only if you're using App Router

import { useState } from 'react';
import Image from 'next/image';

export default function SchoolPage() {

    const [activeTab, setActiveTab] = useState('All');

    const tabs = ["All", "School", "Classes", "Clubs"];

    return (
        <div className="flex flex-col items-center justify-center ">
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

            <div className='py-5 flex flex-col items-center'>
                <a className='text-4xl font-bold text-[#243056]'>SMK Kuala Kurau</a>
                <a className='sm: text-center'>8a, Jln Pantai, Kampung Batu Empat Belas, 34350 Kuala Kurau, Perak </a>
            </div>


            <div className='py-6 px-4 rounded-2xl h-10 bg-white flex flex-row items-center justify-center gap-6 text-xl font-semibold text-[#314073]'>
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

            <div className='w-300 py-5 bg-white flex flex-row items-center justify-between'>
                <div className='flex flex-col items-start'>
                    <a className='text-2xl font-bold'>Recent Updates</a>
                    <a>3 updates since last week.</a>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
}
