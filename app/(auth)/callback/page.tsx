"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";

// 1. Move the logic into a internal handler component
const CallbackHandler = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      console.error("OAuth Error:", error);
      router.push("/login?error=auth_failed");
      return;
    }

    if (token) {
      localStorage.setItem("token", token);
      const savedRole = localStorage.getItem("loginRole");

      if (savedRole === "brand") {
        router.push("/brand");
      } else {
        router.push("/dashboard");
      }
    }
  }, [searchParams, router]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4">
      <Loader />
      <p className="text-[#040136] animate-pulse">Completing login...</p>
    </div>
  );
};

// 2. Export a default component wrapped in Suspense
const AuthCallback = () => {
  return (
    <Suspense fallback={
      <div className="h-screen w-full flex flex-col items-center justify-center gap-4">
        <Loader />
        <p className="text-[#040136] opacity-50">Preparing session...</p>
      </div>
    }>
      <CallbackHandler />
    </Suspense>
  );
};

export default AuthCallback;