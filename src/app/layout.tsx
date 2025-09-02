import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


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
        <main className="flex-grow bg-gradient-to-b from-[#B2B8EE] to-[#F3F4FE]">
          {children}
        </main>
      </body>
    </html>
  );
}
