"use client";

import { usePathname } from "next/navigation";
import Header from "./Header/Header";

export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    // Check if we are on a Course page (LMS)
    const isCoursePage = pathname?.startsWith("/profile");

    return (
        <>
            {!isCoursePage && <Header activeSection="home" />}

            {isCoursePage ? (
                // Render children directly without extra padding for Course pages
                <main>{children}</main>
            ) : (
                // Render with top padding for other pages to account for fixed header
                <main className="pt-16">
                    {children}
                </main>
            )}
        </>
    );
}
