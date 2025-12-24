"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export function useRequireCreator() {
    const router = useRouter();
    const {
        isAuthenticated,
        userType,
        token,
        fetchProfile,
        profile,
    } = useAuthStore();

    useEffect(() => {
        // ❌ No token or not logged in
        if (!token || !isAuthenticated) {
            router.replace("/login");
            return;
        }

        // ❌ Wrong role
        if (userType !== "creator") {
            router.replace("/login");
            return;
        }

        // ✅ Logged in but profile not yet loaded
        if (!profile) {
            fetchProfile();
        }
    }, [token, isAuthenticated, userType, profile, fetchProfile, router]);

    const isReady =
        isAuthenticated && token && userType === "creator" && !!profile;

    return { isReady };
}
