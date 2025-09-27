import Image from "next/image";
import React from "react";

const SchoolBackground = () => {
    return (
        <div className='relative w-full max-w-270 h-[180px] sm:h-[220px] md:h-[300px] lg:h-[380px] mx-auto rounded-lg overflow-hidden'>
            <Image
                src="/schoolpic3.jpg"
                alt="School Image"
                fill
                className="object-cover"
            />

            <div className='absolute inset-0 flex items-center justify-center'>
                <Image
                    src="/mrsmlogo.png"
                    alt="School Logo"
                    width={200}
                    height={200}
                    className='object-contain'
                />
            </div>
        </div>
    );
};

export default SchoolBackground;
