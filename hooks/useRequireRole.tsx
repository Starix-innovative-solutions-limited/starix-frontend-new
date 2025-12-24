"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

type UserRole = "creator" | "brand" | "admin";

export function useRequireRole(role: UserRole) {
    const router = useRouter();

    const {
        isAuthenticated,
        userType,
        token,
        profile,
        fetchProfile,
    } = useAuthStore();

    useEffect(() => {
        // ❌ Not logged in
        if (!isAuthenticated) {
            router.replace("/login");
            return;
        }

        // ❌ Wrong role
        if (userType !== role) {
            router.replace("/login");
            return;
        }

        // ✅ Correct role but profile not loaded yet
        if (!profile) {
            fetchProfile();
        }
    }, [token, isAuthenticated, userType, role, profile, fetchProfile, router]);

    const isReady = useMemo(() => {
        return (
            isAuthenticated &&
            !!token &&
            userType === role &&
            !!profile
        );
    }, [isAuthenticated, token, userType, role, profile]);

    return { isReady };
}