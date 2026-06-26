"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GoCheckCircleFill, GoAlertFill } from "react-icons/go";
import { useAcceptInvitation } from "@/hooks/useCircles";
import { useQueryClient } from "@tanstack/react-query";

const AcceptInvitationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const queryClient = useQueryClient();

  const acceptInvitation = useAcceptInvitation();
  const [submittedToken, setSubmittedToken] = useState<string | null>(null);

  useEffect(() => {
    if (!token || submittedToken === token || acceptInvitation.isPending) return;

    const authToken = localStorage.getItem("token");
    if (!authToken) {
      router.push(`/login?callbackUrl=${encodeURIComponent(`/accept?token=${token}`)}`);
      return;
    }

    setSubmittedToken(token);
    
    acceptInvitation.mutate(token, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["my-invitations"] });
      }
    });
  }, [token, submittedToken, acceptInvitation, router, queryClient]);

  // ── No token ─────────────────────────────────────────────────────────────
  if (!token) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center max-w-[420px]">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
            <GoAlertFill className="text-red-500" size={28} />
          </div>
          <h1 className="text-[22px] font-semibold text-[#1E1F24] mb-2">Invalid invitation link</h1>
          <p className="text-[14px] text-[#62636C] mb-8">This link is missing its invitation token.</p>
          <button onClick={() => router.push("/")} className="px-8 py-3.5 bg-[#0033FF] text-white rounded-full font-semibold text-[14px] hover:bg-[#0026CC]">Go Home</button>
        </div>
      </div>
    );
  }

  // ── Loading ──────────────────────────────────────────────────────────────
  if (acceptInvitation.isPending || (!acceptInvitation.isSuccess && !acceptInvitation.isError)) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-6 border-3 border-[#0033FF] border-t-transparent rounded-full animate-spin" />
          <p className="text-[14px] text-[#62636C]">Accepting your invitation...</p>
        </div>
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────────
  if (acceptInvitation.isError) {
    const error = acceptInvitation.error as any;
    const status = error?.response?.status;
    const detail = error?.response?.data?.detail;

    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center max-w-[420px]">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
            <GoAlertFill className="text-red-500" size={28} />
          </div>
          <h1 className="text-[22px] font-semibold text-[#1E1F24] mb-2">Couldn't accept invitation</h1>
          <p className="text-[14px] text-[#62636C] mb-8">{typeof detail === 'string' ? detail : "Something went wrong."}</p>
          <button onClick={() => router.push("/")} className="px-8 py-3 bg-[#0033FF] text-white rounded-full font-semibold text-[14px]">Go Home</button>
        </div>
      </div>
    );
  }

  // ── Success ──────────────────────────────────────────────────────────────
  if (acceptInvitation.isSuccess) {
    // API returns circle_id. Assuming it returns circle_name, otherwise use ID
    const circleId = acceptInvitation.data?.circle_id;

    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center max-w-[420px]">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#E5FFE5] flex items-center justify-center">
            <GoCheckCircleFill className="text-[#27AE60]" size={28} />
          </div>
          <h1 className="text-[22px] font-semibold text-[#1E1F24] mb-2">You're in!</h1>
          <p className="text-[14px] text-[#62636C] mb-8">
            Your invitation has been accepted. You are now a member of the circle.
          </p>
          <button
            onClick={() => router.push(`/creator-circles/${circleId}`)}
            className="px-8 py-3.5 bg-[#0033FF] text-white rounded-full font-semibold text-[14px] hover:bg-[#0026CC] transition"
          >
            Open Circle
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default AcceptInvitationPage;