"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiBell } from "react-icons/fi";
import {
  notificationHref,
  notificationKind,
  useGetNotifications,
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  type AccountNotification,
} from "@/hooks/useNotifications";
import BrandAvatar from "@/components/(brand)/BrandAvatar";

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

function avatarFromData(item: AccountNotification) {
  const data = item.data ?? {};
  const keys = [
    "profile_picture_url",
    "avatar_url",
    "image_url",
    "creator_profile_picture_url",
  ];
  for (const key of keys) {
    const value = data[key];
    if (typeof value === "string" && value.trim()) return value;
  }
  return null;
}

export default function BrandNotificationDropdown({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useGetNotifications(1, 20);
  const markOne = useMarkNotificationRead();
  const markAll = useMarkAllNotificationsRead();

  const notifications = data?.items ?? [];
  const unreadCount = data?.unread_count ?? 0;

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

  return (
    <div className="relative shrink-0" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Notifications"
        className="relative rounded-full bg-[#F9F9FB] p-3 transition-colors hover:bg-gray-50"
      >
        <FiBell size={compact ? 20 : 22} className="text-[#111827]" />
        {unreadCount > 0 ? (
          <span className="absolute top-2 right-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#0033FF] px-1 text-[9px] font-semibold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        ) : null}
      </button>

      {isOpen ? (
        <div className="absolute right-0 z-50 mt-2 w-[360px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-50 p-4">
            <p className="text-sm font-semibold text-[#1E1F24]">Notifications</p>
            {unreadCount > 0 ? (
              <button
                type="button"
                onClick={() => markAll.mutate()}
                disabled={markAll.isPending}
                className="text-[11px] font-medium text-[#0033FF] disabled:opacity-50"
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
                  onSeen={() => {
                    if (!item.read_at) markOne.mutate(item.id);
                  }}
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
  onSeen,
}: {
  item: AccountNotification;
  onSeen: () => void;
}) {
  const unread = !item.read_at;
  const kind = notificationKind(item);
  const href = notificationHref(item);

  return (
    <Link
      href={href}
      onClick={onSeen}
      className={`flex gap-3 border-b border-[#F5F6F8] px-4 py-3 last:border-b-0 hover:bg-[#F9FAFB] ${
        unread ? "bg-[#F5F8FF]" : "bg-white"
      }`}
    >
      {kind === "join" ? (
        <BrandAvatar
          name={item.message || item.title}
          src={avatarFromData(item)}
          className="mt-0.5 h-9 w-9"
          letterClassName="text-[10px]"
        />
      ) : (
        <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF4FF] text-[11px] font-semibold text-[#0033FF]">
          {kind === "social" ? "So" : "In"}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-[#1E1F24]">{item.title}</p>
        {item.message ? (
          <p className="mt-0.5 text-[12px] leading-snug text-[#62636C]">
            {item.message}
          </p>
        ) : null}
        <p className="mt-1 text-[11px] text-[#98A2B3]">
          {relativeTime(item.created_at)}
        </p>
      </div>
    </Link>
  );
}
