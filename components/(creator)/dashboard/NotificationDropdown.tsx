"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FiBell } from "react-icons/fi";
import toast from "react-hot-toast";
import {
  CircleNotification,
  useAcceptInvitation,
  useApproveJoinRequest,
  useDeclineInvitation,
  useGetCircleNotifications,
  useRejectJoinRequest,
} from "@/hooks/useCircles";
import { useGetMe } from "@/hooks/useAuth";

const SEEN_KEY = "starix-circle-notifications-seen";

function readSeenIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(SEEN_KEY);
    const parsed = raw ? (JSON.parse(raw) as string[]) : [];
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

function writeSeenIds(ids: Set<string>) {
  window.localStorage.setItem(SEEN_KEY, JSON.stringify(Array.from(ids)));
}

function relativeTime(iso: string) {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diff = Date.now() - then;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [seenIds, setSeenIds] = useState<Set<string>>(new Set());
  const [hasMounted, setHasMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: user } = useGetMe();
  const { data: notifications = [], isLoading } = useGetCircleNotifications(user?.id);
  const acceptMutation = useAcceptInvitation();
  const declineMutation = useDeclineInvitation();
  const approveMutation = useApproveJoinRequest();
  const rejectMutation = useRejectJoinRequest();

  useEffect(() => {
    setHasMounted(true);
    setSeenIds(readSeenIds());
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unseenCount = useMemo(() => {
    if (!hasMounted) return 0;
    return notifications.filter((item) => item.sticky || !seenIds.has(item.id)).length;
  }, [hasMounted, notifications, seenIds]);

  const markSeen = (ids: string[]) => {
    setSeenIds((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.add(id));
      writeSeenIds(next);
      return next;
    });
  };

  const handleMarkAllRead = () => {
    markSeen(notifications.map((item) => item.id));
  };

  const handleAccept = async (invitationId: string) => {
    try {
      await acceptMutation.mutateAsync(invitationId);
      toast.success("Invitation accepted");
    } catch {
      toast.error("Could not accept this invitation");
    }
  };

  const handleDecline = async (invitationId: string) => {
    try {
      await declineMutation.mutateAsync(invitationId);
      toast.success("Invitation declined");
    } catch {
      toast.error("Could not decline this invitation");
    }
  };

  const handleApprove = async (circleId: string, requestId: string) => {
    try {
      await approveMutation.mutateAsync({ circleId, requestId });
      toast.success("Join request approved");
    } catch {
      toast.error("Could not approve this request");
    }
  };

  const handleReject = async (circleId: string, requestId: string) => {
    try {
      await rejectMutation.mutateAsync({ circleId, requestId });
      toast.success("Join request rejected");
    } catch {
      toast.error("Could not reject this request");
    }
  };

  const isBusy =
    acceptMutation.isPending ||
    declineMutation.isPending ||
    approveMutation.isPending ||
    rejectMutation.isPending;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Notifications"
        className="relative p-3 bg-[#F9F9FB] rounded-full cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <FiBell size={24} className="text-[#111827]" />
        {unseenCount > 0 && (
          <span className="absolute top-2 right-2 min-w-[16px] h-4 px-1 bg-[#0033FF] text-white text-[9px] font-semibold rounded-full flex items-center justify-center">
            {unseenCount > 9 ? "9+" : unseenCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[360px] bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden">
          <div className="p-4 border-b border-gray-50 flex items-center justify-between">
            <p className="font-semibold text-sm">Notifications</p>
            {notifications.length > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-[11px] font-medium text-[#0033FF]"
              >
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-[420px] overflow-y-auto">
            {isLoading ? (
              <div className="p-6 text-center text-xs text-gray-400">Loading notifications...</div>
            ) : notifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-gray-400">No new notifications</div>
            ) : (
              notifications.map((item) => (
                <NotificationRow
                  key={item.id}
                  item={item}
                  unseen={hasMounted && (item.sticky || !seenIds.has(item.id))}
                  busy={isBusy}
                  onSeen={() => markSeen([item.id])}
                  onAccept={handleAccept}
                  onDecline={handleDecline}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

function NotificationRow({
  item,
  unseen,
  busy,
  onSeen,
  onAccept,
  onDecline,
  onApprove,
  onReject,
}: {
  item: CircleNotification;
  unseen: boolean;
  busy: boolean;
  onSeen: () => void;
  onAccept: (invitationId: string) => void;
  onDecline: (invitationId: string) => void;
  onApprove: (circleId: string, requestId: string) => void;
  onReject: (circleId: string, requestId: string) => void;
}) {
  const content = (
    <div className="flex gap-3">
      {item.imageUrl ? (
        <img src={item.imageUrl} className="w-10 h-10 rounded-lg object-cover shrink-0" alt="" />
      ) : (
        <div className="w-10 h-10 rounded-lg bg-gray-100 shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-semibold text-[#111827]">{item.title}</p>
          {unseen && <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#0033FF] shrink-0" />}
        </div>
        <p className="text-[11px] text-[#62636C] mt-0.5 leading-snug">{item.body}</p>
        <p className="text-[10px] text-gray-400 mt-1">{relativeTime(item.at)}</p>
        {item.kind === "invitation" && item.invitationId && (
          <div className="flex gap-2 mt-3">
            <button
              type="button"
              onClick={() => onAccept(item.invitationId!)}
              disabled={busy}
              className="px-3 py-1 bg-[#0033FF] text-white text-[10px] font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => onDecline(item.invitationId!)}
              disabled={busy}
              className="px-3 py-1 bg-gray-100 text-[#62636C] text-[10px] font-semibold rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
            >
              Decline
            </button>
          </div>
        )}
        {item.kind === "join_request" && item.circleId && item.requestId && (
          <div className="flex gap-2 mt-3">
            <button
              type="button"
              onClick={() => onApprove(item.circleId!, item.requestId!)}
              disabled={busy}
              className="px-3 py-1 bg-[#0033FF] text-white text-[10px] font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              Approve
            </button>
            <button
              type="button"
              onClick={() => onReject(item.circleId!, item.requestId!)}
              disabled={busy}
              className="px-3 py-1 bg-gray-100 text-[#62636C] text-[10px] font-semibold rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );

  if (item.href && item.kind !== "invitation" && item.kind !== "join_request") {
    return (
      <Link
        href={item.href}
        onClick={onSeen}
        className="block p-4 hover:bg-gray-50 border-b border-gray-50"
      >
        {content}
      </Link>
    );
  }

  return <div className="p-4 hover:bg-gray-50 border-b border-gray-50">{content}</div>;
}

export default NotificationDropdown;
