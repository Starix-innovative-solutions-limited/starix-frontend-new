"use client";

import React, { Suspense } from "react";
import AuthBg from "@/components/auth/AuthBg";
import { usePathname, useSearchParams } from "next/navigation";

const DynamicAuthBg = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const role = searchParams.get("role");
  const isBrand =
    role === "brand" || pathname?.startsWith("/brand-onboarding");
  return <AuthBg brand={isBrand} />;
};

function AuthFormShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFormPage =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname === "/verify-email";

  return (
    <section
      className={`h-full overflow-y-auto hide-scrollbar ${
        isFormPage ? "md:bg-[#F4F6FB] xl:bg-white" : ""
      }`}
    >
      <div
        className={`flex w-full flex-col items-center ${
          isFormPage
            ? "md:min-h-full md:justify-center md:px-10 md:py-10 xl:min-h-0 xl:justify-start xl:px-0 xl:py-0"
            : ""
        }`}
      >
        <div
          className={`w-full max-w-[650px] ${
            isFormPage
              ? "md:max-w-[480px] md:overflow-hidden md:rounded-[32px] md:border md:border-[#ECEEF3] md:bg-white md:shadow-[0_16px_48px_rgba(4,1,54,0.06)] xl:max-w-[650px] xl:overflow-visible xl:rounded-none xl:border-0 xl:bg-transparent xl:shadow-none"
              : ""
          }`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid h-screen w-full grid-cols-1 overflow-hidden bg-white xl:grid-cols-2">
      
      {/* LEFT SIDE: Visual Content — desktop only */}
      <section className="relative hidden h-full overflow-hidden xl:block">
        <Suspense fallback={<div className="h-full w-full bg-[#D6E9FF] animate-pulse" />}>
          <DynamicAuthBg />
        </Suspense>
      </section>

      {/* RIGHT SIDE: Form Content */}
      <AuthFormShell>{children}</AuthFormShell>
      
    </main>
  );
}