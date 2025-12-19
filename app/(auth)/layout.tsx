"use client";

import React, { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import AuthBg from "@/components/auth/AuthBg";
import { useSearchParams } from "next/navigation";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({

  subsets: ["latin"],

  variable: "--font-geist-mono",

});

// Create a small sub-component for the dynamic background
const DynamicAuthBg = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  return <AuthBg brand={role === "brand"} showLabel />;
};

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className={`${geist.variable} ${geistMono.variable} md:h-screen p-7`}>
      <div className="md:min-w-2xl xl:min-w-7xl xl:max-w-7xl mx-auto flex flex-col gap-7">
        {/* Logo */}
        <div className="bg-dark-navy w-fit py-3 px-2 rounded-lg shadow-2xs max-md:hidden">
          <Image src={"/logo-white.svg"} width={100} height={100} className="w-24" alt="Logo" priority />
        </div>

        <div className=" h-full md:h-[86vh] grid md:grid-cols-2 gap-10 xl:gap-14 items-center overflow-hidden">

          {/* Wrap only the background logic in Suspense */}
          <Suspense fallback={<div className="bg-gray-100 animate-pulse h-full w-full rounded-3xl" />}>
            <DynamicAuthBg />
          </Suspense>

          <div className="overflow-y-auto md:h-full hide-scrollbar">
            {/* If your children (like signup page) also use searchParams, 
               they should also have their own Suspense boundaries inside their files.
            */}
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;