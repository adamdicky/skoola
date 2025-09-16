import React from "react";
import { Tag } from "./StatusTag";
import { ChevronDown } from "lucide-react";
import { PencilSimpleIcon } from "@phosphor-icons/react";
import { TrashSimpleIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button"
import { ImageGallery } from "./ImageGallery";
import EditPostModal from "./EditPostModal";
import RemarkBox from "./RemarkBox";

interface PostListProps {
    title: string;
    date: string;
    status: "Approved" | "Pending" | "Remarked" | "Rejected";
    showStatus?: boolean;
}



const PostList: React.FC<PostListProps> = ({ title, date, status, showStatus = true }) => {

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
        { id: 3, name: "Teamwork", color: "blue" },

    ];

    const [openPost, setOpenPost] = React.useState(false);
    const [openEditPost, setOpenEditPost] = React.useState(false); // for edit post modal



    const statusColorMap: Record<string, "green" | "yellow" | "blue" | "red"> = {
        Approved: "green",
        Pending: "yellow",
        Remarked: "blue",
        Rejected: "red",
    };

    return (
        <div className="rounded-lg outline-1 outline-[#9298D0] ">
            <div className="flex items-center justify-between bg-[#F3F4FE] px-5 py-3 rounded-lg">
                <div className="flex-1 min-w-0">
                    <a className={`text-lg font-semibold text-[#243056] line-clamp-2 ${openPost
                        ? "whitespace-normal break-words"
                        : "truncate"
                        }`}>
                        {title}
                    </a>
                </div>

                {/* text-lg font-semibold text-[#243056] line-clamp-2 whitespace-normal sm:whitespace-normal md:truncate md:max-w-170 md:line-clamp-2 */}

                <div className="flex flex-shrink-0 items-center gap-3 ml-4">
                    <a className="text-[#6E7793] text-right whitespace-nowrap">{date}</a>

                    {showStatus && status && (
                        <Tag name={status} color={statusColorMap[status]} />

                    )}

                    <Button variant="ghost" className=' text-[#314073] hover:cursor-pointer' onClick={() => setOpenPost(!openPost)}>
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
                        <div className="px-5 pb-5">
                            <div className=" pb-3">
                                <RemarkBox />
                            </div>

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

                            <div className="flex items-center md:justify-between md:gap-0 sm:justify-between sm:gap-0 justify-center gap-2 flex-wrap">
                                <div className="flex gap-2 flex-wrap">
                                    {mockTags.map(tag => (
                                        <Tag key={tag.id} name={tag.name} color={tag.color as any} />
                                    ))}
                                </div>

                                <div className="flex gap-2 sm: justify-center sm:items-center mt-2 sm:mt-0">
                                    <PencilSimpleIcon size={25} weight="bold" onClick={() => setOpenEditPost(true)} className="text-blue-400 hover:text-blue-500 transition-colors duration-200 cursor-pointer" />
                                    <TrashSimpleIcon size={25} weight="bold" className="text-red-400 hover:text-red-500 transition-colors duration-200 cursor-pointer" />
                                </div>
                            </div>

                            <a className="font-small text-[#6E7793] pt-3 block italic">Last updated: 20 January by Admin: Teacher Hanafiah</a>
                        </div>

                    </div>
                )
            }

            <EditPostModal open={openEditPost} onOpenChange={setOpenEditPost} />

        </div>

    );
};

export default PostList;

