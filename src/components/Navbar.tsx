import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";

import {
    Command,
    CommandInput,
} from "@/components/ui/command";

const Navbar = () => {
    return (
        <nav className="w-full py-4 px-6 md:px-20 bg-[#B2B8EE] flex flex-col md:flex-row justify-between items-center sm:items-center md:items-center gap-4 md:gap-0">
            <div className="w-full md:w-auto flex flex-col md:flex-row justify-between items-center sm:items-center md:items-center gap-4 md:gap-10">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={100}
                    height={100}
                />

                <div className="w-full md:w-[300px]">
                    <Command>
                        <CommandInput placeholder="Type a command or search..." />
                    </Command>
                </div>

                <div className="flex flex-row gap-5 sm:flex-row md:flex-row justify-start md:justify-between items-start md:items-center sm:gap-5 md:gap-5 text-sm text-[#212F58]">
                    <a href="/newsfeed/school" className="text-lg font-semibold">Pricing</a>
                    <a href="/newsfeed/class" className="text-lg font-semibold">About</a>
                    <a href="/student-application" className="text-lg font-semibold">Help</a>
                </div>
            </div>

            <div className="self-auto sm:self-auto md:self-auto px-5">
                <Button variant="skoola" className="hover:cursor-pointer">
                    <strong>Log In</strong>
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;
