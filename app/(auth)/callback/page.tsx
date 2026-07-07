"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";

// 1. Move the logic into a internal handler component
const CallbackHandler = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const hashParams =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.hash.replace(/^#/, ""))
        : new URLSearchParams();
  
    const token =
      searchParams.get("token") ||
      searchParams.get("access_token") ||
      hashParams.get("token") ||
      hashParams.get("access_token");
  
    const error =
      searchParams.get("error") ||
      hashParams.get("error");
  
    const userTypeFromUrl =
      searchParams.get("user_type") ||
      hashParams.get("user_type");
  
    const savedRole =
      localStorage.getItem("oauthRole") ||
      localStorage.getItem("loginRole");
  
    if (error) {
      console.error("OAuth Error:", error);
      router.replace("/login?error=auth_failed");
      return;
    }
  
    if (!token) {
      console.error("OAuth callback missing token", {
        query: Object.fromEntries(searchParams.entries()),
        hash: Object.fromEntries(hashParams.entries()),
        href: window.location.href,
      });
  
      router.replace("/login?error=missing_token");
      return;
    }
  
    localStorage.setItem("token", token);
  
    const finalRole = userTypeFromUrl || savedRole || "creator";
  
    localStorage.removeItem("oauthRole");
    localStorage.removeItem("oauthMode");
    localStorage.removeItem("loginRole");
  
    router.replace(finalRole === "brand" ? "/brand" : "/dashboard");
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