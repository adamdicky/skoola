import Image from "next/image";
import React from "react";

const Footer = () => {
    return (
        <footer className="flex flex-col md:flex-row md:gap-0 justify-between items-center md:items-center w-full md:w-full px-1 py-5 gap-5  bg-white text-[#212F58]">
            <Image src="/logo.png" alt="Logo" width={150} height={150} className="m-auto md:m-auto" />

            <div className="flex flex-row sm:flex-row md:w-auto md:m-auto justify-around items-start w-full gap-10 md:gap-40 text-sm m-auto ">
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
                    <li><a href="#">Data & Handling Storage</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
