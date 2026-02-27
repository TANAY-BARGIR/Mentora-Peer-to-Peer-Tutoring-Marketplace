import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/common/AuthContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Mentora — Peer-to-Peer Tutoring",
    description: "Connect students with expert tutors for personalized learning.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
