import Image from "next/image";
import React from "react";

const Footer = () => {
    return (
        <footer className="flex flex-row justify-between items-center w-full px-100 py-5 bg-white text-[#212F58]">
            <Image src="/logo.png" alt="Logo" width={150} height={150} />

            <div className="flex flex-row justify-around items-start gap-40">
                <ul className="text-left">
                    <li><b>Links</b></li>
                    <li><a href="/newsfeed/school">Pricing</a></li>
                    <li><a href="/newsfeed/class">About</a></li>
                    <li><a href="/student-application">Help</a></li>
                </ul>

                <ul className="text-left">
                    <li><b>Contact Us</b></li>
                    <li><a href="/">hello@skoola.my</a></li>
                    <li><a href="/">+60 13-526 2840</a></li>
                    <li><a href="/">X @ skoola_my</a></li>
                </ul>

                <ul className="text-left">
                    <li><b>Legal</b></li>
                    <li>Terms of Service</li>
                    <li>Data & Handling Storage</li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
