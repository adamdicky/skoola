import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
    Command,
    CommandInput,
} from "@/components/ui/command";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
    title: "Skoola",
    description: "A platform for schools to connect and share information.",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow bg-gradient-to-b from-[#B2B8EE] to-[#F3F4FE]">
                    {/* <div className="w-full max-w-170 px-5 pb-5 flex justify-center items-center m-auto">
                        <Command>
                            <CommandInput placeholder="Search school..." />
                        </Command>
                    </div> */}
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
