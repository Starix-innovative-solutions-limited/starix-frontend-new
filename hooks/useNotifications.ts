import { api } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type NotificationEventType =
  | "challenge_joined"
  | "social_connected"
  | "social_reconnected"
  | "social_disconnected"
  | string;

export type AccountNotification = {
  id: string;
  event_type: NotificationEventType;
  title: string;
  message: string;
  data: Record<string, unknown> | null;
  created_at: string;
  read_at: string | null;
};

export type NotificationsPage = {
  items: AccountNotification[];
  total: number;
  unread_count: number;
};

const QUERY_KEY = ["notifications"] as const;

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : null;
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function normalizeNotification(raw: unknown): AccountNotification | null {
  const item = asRecord(raw);
  if (!item) return null;
  const id = asString(item.id);
  if (!id) return null;
  const data = asRecord(item.data);
  return {
    id,
    event_type: asString(item.event_type) || "unknown",
    title: asString(item.title) || "Notification",
    message: asString(item.message),
    data,
    created_at: asString(item.created_at),
    read_at: asString(item.read_at) || null,
  };
}

function unwrapNotifications(payload: unknown): NotificationsPage {
  const root = asRecord(payload) ?? {};
  const nested =
    Array.isArray(root.items) || typeof root.unread_count === "number"
      ? root
      : asRecord(root.data) ?? root;
  const items = Array.isArray(nested.items)
    ? nested.items
        .map(normalizeNotification)
        .filter((item): item is AccountNotification => Boolean(item))
    : [];
  const total =
    typeof nested.total === "number" ? nested.total : items.length;
  const unread_count =
    typeof nested.unread_count === "number"
      ? nested.unread_count
      : items.filter((item) => !item.read_at).length;
  return { items, total, unread_count };
}

function dataValue(item: AccountNotification, ...keys: string[]) {
  const data = item.data ?? {};
  for (const key of keys) {
    const value = data[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

export function notificationHref(item: AccountNotification): string {
  const event = item.event_type.toLowerCase();
  const challengeId = dataValue(
    item,
    "challenge_id",
    "challengeId",
    "challengeID"
  );

  if (event === "challenge_joined" && challengeId) {
    return `/brand/submissions?challenge_id=${encodeURIComponent(challengeId)}`;
  }
  if (event.startsWith("social_")) {
    return "/profile";
  }
  if (challengeId) {
    return `/brand/challenges/${encodeURIComponent(challengeId)}`;
  }
  return "/brand";
}

export function notificationKind(
  item: AccountNotification
): "join" | "social" | "other" {
  const event = item.event_type.toLowerCase();
  if (event === "challenge_joined") return "join";
  if (event.startsWith("social_")) return "social";
  return "other";
}

export function useGetNotifications(page = 1, pageSize = 20) {
  return useQuery({
    queryKey: [...QUERY_KEY, page, pageSize],
    queryFn: async () => {
      const { data } = await api.get("/notifications", {
        params: { page, page_size: pageSize },
      });
      return unwrapNotifications(data);
    },
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: string) => {
      const { data } = await api.patch<AccountNotification>(
        `/notifications/${notificationId}/read`
      );
      return normalizeNotification(data);
    },
    onSuccess: (updated) => {
      queryClient.setQueriesData<NotificationsPage>(
        { queryKey: QUERY_KEY },
        (old) => {
          if (!old || !updated) return old;
          const items = old.items.map((item) =>
            item.id === updated.id
              ? { ...item, ...updated, read_at: updated.read_at || item.read_at || new Date().toISOString() }
              : item
          );
          const unread_count = items.filter((item) => !item.read_at).length;
          return { ...old, items, unread_count };
        }
      );
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.post("/notifications/read-all");
    },
    onSuccess: () => {
      const now = new Date().toISOString();
      queryClient.setQueriesData<NotificationsPage>(
        { queryKey: QUERY_KEY },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            unread_count: 0,
            items: old.items.map((item) => ({
              ...item,
              read_at: item.read_at || now,
            })),
          };
        }
      );
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
