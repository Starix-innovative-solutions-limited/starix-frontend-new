"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";

const AuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Your backend will redirect to: yoursite.com/auth/callback?token=XYZ
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      console.error("OAuth Error:", error);
      router.push("/login?error=auth_failed");
      return;
    }

    if (token) {
      // 1. Save the token
      localStorage.setItem("token", token);

      // 2. Retrieve the role we saved before leaving for Google
      const savedRole = localStorage.getItem("loginRole");

      // 3. Redirect to the correct dashboard
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
      <p className="text-dark-navy animate-pulse">Completing login...</p>
    </div>
  );
};

export default AuthCallback;