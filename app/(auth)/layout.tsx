"use client";

import React, { Suspense } from "react";
import AuthBg from "@/components/auth/AuthBg";
import { useSearchParams } from "next/navigation";

const DynamicAuthBg = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  return <AuthBg brand={role === "brand"} />;
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 h-screen w-full overflow-hidden bg-white">
      
      {/* LEFT SIDE: Visual Content */}
      <section className="hidden md:block h-full relative overflow-hidden">
        <Suspense fallback={<div className="h-full w-full bg-[#D6E9FF] animate-pulse" />}>
          <DynamicAuthBg />
        </Suspense>
      </section>

      {/* RIGHT SIDE: Form Content */}
      <section className="h-full overflow-y-auto flex flex-col items-center hide-scrollbar">
        {/* max-w-[480px] matches your sidebar.png proportions exactly */}
        <div className="w-full max-w-[650px]">
          {children}
        </div>
      </section>
      
    </main>
  );
}