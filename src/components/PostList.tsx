import React from "react";
import { Tag } from "./StatusTag";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button"
import { ImageGallery } from "./ImageGallery";

interface PostListProps {
    title: string;
    date: string;
    status: "Approved" | "Pending" | "Remarked" | "Rejected";
}



const PostList: React.FC<PostListProps> = ({ title, date, status }) => {

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

    const [openPost, setOpenPost] = React.useState(false);
    const statusColorMap: Record<string, "green" | "yellow" | "blue" | "red"> = {
        Approved: "green",
        Pending: "yellow",
        Remarked: "blue",
        Rejected: "red",
    };

    return (
        <div className="rounded-lg outline-1 outline-[#9298D0] overflow-hidden">
            <div className="flex items-center justify-between bg-[#F3F4FE] px-4 py-2 rounded-lg outline-1 outline-[#9298D0]">
                <div className="flex-1 min-w-0">
                    <a className="text-lg font-semibold text-[#243056] line-clamp-2 sm:whitespace-normal md:truncate md:max-w-170 md:line-clamp-2">
                        {title}
                    </a>
                </div>

                <div className="flex flex-shrink-0 items-center gap-4 ml-4">
                    <a className="text-[#6E7793] text-right whitespace-nowrap">{date}</a>
                    <Tag name={status} color={statusColorMap[status]} />
                    <Button variant="ghost" className=' text-[#314073]' onClick={() => setOpenPost(!openPost)}>
                        <ChevronDown
                            className={`w-5 h-5 text-[#314073] transform transition-transform duration-200 ${openPost ? "rotate-180" : ""
                                }`}
                        />
                    </Button>
                </div>
            </div>

            {
                openPost && (
                    <div className="bg-[#F3F4FE]">
                        <div className="p-4">

                            <p className="whitespace-pre-line text-justify text-[#314073]">
                                The official Final Examination Calendar for all students (Standard 1 to Standard 6) is now available. Please refer to the attached schedule for specific exam dates, subjects, and time slots.

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
                )
            }
        </div>

    );
};

export default PostList;

