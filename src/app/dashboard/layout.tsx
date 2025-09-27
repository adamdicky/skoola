import { Inter } from "next/font/google";
import "../globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
    title: "Skoola",
    description: "A platform for schools to connect and share information.",
}

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className="min-h-screen flex flex-col">
                <Navbar />
                {/* make main a flex container */}
                <main className="flex-1 flex flex-col bg-gradient-to-b from-[#B2B8EE] to-[#F3F4FE]">
                    {/* force the children wrapper to grow */}
                    <div className="flex-1 flex flex-col">
                        {children}
                    </div>
                </main>
                <Footer />
            </body>
        </html>
    );
}

