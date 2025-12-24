"use client"

import React from "react";
import { Work_Sans } from "next/font/google";
// import { SideBar, TopBar } from "@/components/dashboard";
import NavBar from "@/components/(brand)/NavBar";
import { useRequireRole } from "@/hooks/useRequireRole";
// import { useRefreshToken } from "@/hooks/useAuth";

const workSans = Work_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-work-sans",
});

const BrandDashboardLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    // const { mutate } = useRefreshToken()

    const { isReady } = useRequireRole("brand");

    // Prevent UI flicker while checking auth
    if (!isReady) {
        return null; // or a loader
    }



    return (
        <main className={` ${workSans.variable} bg-[#fafafa] h-[100vh]`}>
            <NavBar />
            <div className="">
                {children}
            </div>
        </main>
    );
};

export default BrandDashboardLayout;