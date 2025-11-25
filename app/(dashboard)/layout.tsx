import React from "react";
import { Work_Sans } from "next/font/google";
import { SideBar, TopBar } from "@/components/dashboard";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work-sans",
});

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className={` ${workSans.variable} bg-[#f5f5f5]`}>
      <div className="md:flex p-6 gap-6 h-[100vh] overflow-hidden">
        <SideBar className={"max-md:hidden rounded-2xl shadow border border-gray-200 md:max-h-[95vh]"} />
        <div className=" grow flex flex-col h-screen">
          <TopBar />
          <div className="grow overflow-y-scroll max-md:pt-4  p-4 md:p-8 md:py-12">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
