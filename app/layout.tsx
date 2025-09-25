import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    weight: ["400", "500", "600", "700"], // choose weights you need
});

export const metadata: Metadata = {
    title: "InterviewMaster",
    description: "An AI-powered platform for mock interview",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
        <body className={`${inter.className} antialiased pattern`}>
        {children}
        </body>
        </html>
    );
}
