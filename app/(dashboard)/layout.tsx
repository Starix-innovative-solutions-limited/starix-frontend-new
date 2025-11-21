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
    <main className={` ${workSans.variable}`}>
      <div className="md:flex">
        <SideBar className={"max-md:hidden"} />
        <div className=" grow flex flex-col h-screen">
          <TopBar />
          <div className="grow overflow-y-scroll max-md:pt-4 bg-[#FEFEFE] p-4 md:p-8">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
