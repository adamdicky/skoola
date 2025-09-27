import Image from "next/image";
import React from "react";

const Footer = () => {
    return (
        <footer >
            <div className="flex flex-col md:flex-row md:gap-0 justify-around items-center md:items-center w-full gap-5 pt-5 md:pt-0 bg-white text-[#212F58]">
                <Image src="/logo.png" alt="Logo" width={150} height={150} className="m-auto md:m-auto" />

                <div className="flex flex-row sm:flex-row md:w-auto md:m-auto justify-center items-start w-full gap-15 md:gap-20 text-sm p-5 ">
                    <ul className="text-left space-y-1">
                        <li><b>Links</b></li>
                        <li><a href="/newsfeed/school">Pricing</a></li>
                        <li><a href="/newsfeed/class">About</a></li>
                        <li><a href="/student-application">Help</a></li>
                    </ul>

                    <ul className="text-left space-y-1">
                        <li><b>Contact Us</b></li>
                        <li><a href="mailto:hello@skoola.my">hello@skoola.my</a></li>
                        <li><a href="tel:+60135262840">+60 13-526 2840</a></li>
                        <li><a href="https://twitter.com/skoola_my" target="_blank">X @ skoola_my</a></li>
                    </ul>

                    <ul className="text-left space-y-1">
                        <li><b>Legal</b></li>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#" className="">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>


            <div className="text-center text-xs text-gray-500 bg-white pb-5">
                © {new Date().getFullYear()} Skoola. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
