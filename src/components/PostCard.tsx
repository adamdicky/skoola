import Image from "next/image";
import React from "react";
import { UserIcon } from "@phosphor-icons/react";
import { ImageGallery } from "@/components/ImageGallery";
import { Tag } from "@/components/PostTag";

const PostCard = () => {

    const images = [
        "/images4.jpeg",
        "/images3.jpg",
        "/images2.jpg",
        "/images1.jpg",
        "/images5.jpg",
    ];

    const mockTags = [
        { id: 1, name: "Examination", color: "red" },
        { id: 2, name: "Activity", color: "green" },
        { id: 3, name: "Team-Building", color: "blue" },

    ];

    return (
        <div className='w-full max-w-270 pb-6'>
            <div className='w-full bg-white rounded-lg p-6 border border-[#B2B8EE] flex flex-col '>

                <div className='flex flex-row gap-2 '>
                    <UserIcon size={44} weight="duotone" color='#4F378A' className='' />
                    <div className='flex flex-col leading-2'>
                        <a className="text-lg font-semibold text-[#314073]">SMK Kuala Kurau</a>
                        <a className="font-light text-[#243056]">15 March, 2020 at 3:30PM</a>
                    </div>
                </div>

                <h3 className='pt-3 pb-1 text-xl font-semibold text-[#314073]'>Exam Results</h3>
                <p className='whitespace-pre-line text-justify text-[#314073] font-'>The official Final Examination Calendar for all students (Standard 1 to Standard 6) is now available. Please refer to the attached schedule for specific exam dates, subjects, and time slots.

                    Kindly ensure that students are well-prepared and arrive on time for each examination day. Teachers and parents are encouraged to help students revise accordingly.

                    📌 Note: Any changes to the schedule will be updated here. Please check regularly.
                    🗓️ Examination Week: 21 October – 25 October 2025 📍 Location: In respective classrooms
                </p>

                <div className="pt-3">
                    <ImageGallery images={images} />
                </div>

                <hr className="my-4 border-t border-gray-400" />

                <div className="flex gap-2 flex-wrap">
                    {mockTags.map(tag => (
                        <Tag key={tag.id} name={tag.name} color={tag.color as any} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostCard;
