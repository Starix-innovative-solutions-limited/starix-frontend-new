"use client";

import React from "react";
import { Work_Sans } from "next/font/google";
import NavBar from "@/components/(brand)/NavBar";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work-sans",
});

const BrandDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <main className={`${workSans.variable} bg-[#fafafa] min-h-screen`}>
      <NavBar />
      <div>{children}</div>
    </main>
  );
};

export default BrandDashboardLayout;
