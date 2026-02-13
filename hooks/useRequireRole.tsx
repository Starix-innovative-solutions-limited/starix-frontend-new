"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

type UserRole = "dashboard" | "brand" | "admin";

export function useRequireRole(role: UserRole) {
  const router = useRouter();

  const {
    isAuthenticated,
    userType,
    token,
    profile,
    fetchProfile,
    hasHydrated,
  } = useAuthStore() as any;

  useEffect(() => {
    if (!hasHydrated) return;

    // ❌ Not logged in
    if (!isAuthenticated || !token) {
      router.replace(`/login${role === "brand" ? "?role=brand" : ""}`);
      return;
    }

    // ❌ Wrong role
    if (userType && userType !== role) {
      router.replace(userType === "brand" ? "/brand" : "/dashboard");
      return;
    }

    // ✅ Fetch profile in background
    if (!profile) {
      fetchProfile();
    }
  }, [
    hasHydrated,
    isAuthenticated,
    token,
    userType,
    role,
    profile,
    fetchProfile,
    router,
  ]);

  const isReady = useMemo(() => {
    if (!hasHydrated) return false;

    // DO NOT block on profile
    return (
      isAuthenticated &&
      !!token &&
      userType === role
    );
  }, [hasHydrated, isAuthenticated, token, userType, role]);

  return { isReady };
}
