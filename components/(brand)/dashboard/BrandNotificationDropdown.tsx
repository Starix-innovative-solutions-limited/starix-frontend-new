"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FiBell } from "react-icons/fi";
import {
  useGetBrandNotifications,
  type BrandNotification,
} from "@/hooks/useChallenges";
import BrandAvatar from "@/components/(brand)/BrandAvatar";

const SEEN_KEY = "starix-brand-notifications-seen";

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
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

export default function BrandNotificationDropdown({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [seenIds, setSeenIds] = useState<Set<string>>(new Set());
  const [hasMounted, setHasMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { notifications, isLoading } = useGetBrandNotifications();

  useEffect(() => {
    setHasMounted(true);
    setSeenIds(readSeenIds());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unseenCount = useMemo(() => {
    if (!hasMounted) return 0;
    return notifications.filter((item) => !seenIds.has(item.id)).length;
  }, [hasMounted, notifications, seenIds]);

  const markSeen = (ids: string[]) => {
    setSeenIds((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.add(id));
      writeSeenIds(next);
      return next;
    });
  };

  return (
    <div className="relative shrink-0" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Notifications"
        className={`relative rounded-full bg-[#F9F9FB] p-3 transition-colors hover:bg-gray-50 ${
          compact ? "" : ""
        }`}
      >
        <FiBell size={compact ? 20 : 22} className="text-[#111827]" />
        {unseenCount > 0 ? (
          <span className="absolute top-2 right-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#0033FF] px-1 text-[9px] font-semibold text-white">
            {unseenCount > 9 ? "9+" : unseenCount}
          </span>
        ) : null}
      </button>

      {isOpen ? (
        <div className="absolute right-0 z-50 mt-2 w-[360px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-50 p-4">
            <p className="text-sm font-semibold text-[#1E1F24]">Notifications</p>
            {notifications.length > 0 ? (
              <button
                type="button"
                onClick={() => markSeen(notifications.map((item) => item.id))}
                className="text-[11px] font-medium text-[#0033FF]"
              >
                Mark all read
              </button>
            ) : null}
          </div>
          <div className="max-h-[420px] overflow-y-auto">
            {isLoading ? (
              <p className="p-6 text-center text-xs text-gray-400">
                Loading notifications...
              </p>
            ) : notifications.length === 0 ? (
              <p className="p-6 text-center text-xs text-gray-400">
                No notifications yet
              </p>
            ) : (
              notifications.map((item) => (
                <NotificationRow
                  key={item.id}
                  item={item}
                  unseen={hasMounted && !seenIds.has(item.id)}
                  onSeen={() => markSeen([item.id])}
                />
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function NotificationRow({
  item,
  unseen,
  onSeen,
}: {
  item: BrandNotification;
  unseen: boolean;
  onSeen: () => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={onSeen}
      className={`flex gap-3 border-b border-[#F5F6F8] px-4 py-3 last:border-b-0 hover:bg-[#F9FAFB] ${
        unseen ? "bg-[#F5F8FF]" : "bg-white"
      }`}
    >
      {item.kind === "join" ? (
        <BrandAvatar
          name={item.body}
          src={item.avatarUrl}
          className="mt-0.5 h-9 w-9"
          letterClassName="text-[10px]"
        />
      ) : (
        <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF4FF] text-[11px] font-semibold text-[#0033FF]">
          End
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-[#1E1F24]">{item.title}</p>
        <p className="mt-0.5 text-[12px] leading-snug text-[#62636C]">
          {item.body}
        </p>
        <p className="mt-1 text-[11px] text-[#98A2B3]">{relativeTime(item.at)}</p>
      </div>
    </Link>
  );
}
