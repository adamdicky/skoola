import Image from "next/image";
import React from "react";

const SchoolBackground = () => {
    return (
        <div className='relative w-270 aspect-[9/2]'>
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
