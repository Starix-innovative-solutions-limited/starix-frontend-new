import { create } from "zustand";

export type DashboardNoticeType = "success" | "error";

type DashboardNotice = {
  id: number;
  type: DashboardNoticeType;
  message: string;
};

type DashboardNoticeState = {
  notice: DashboardNotice | null;
  show: (type: DashboardNoticeType, message: string) => void;
  clear: () => void;
};

export const useDashboardNoticeStore = create<DashboardNoticeState>((set) => ({
  notice: null,
  show: (type, message) =>
    set({
      notice: {
        id: Date.now(),
        type,
        message,
      },
    }),
  clear: () => set({ notice: null }),
}));

export function useDashboardNotice() {
  const show = useDashboardNoticeStore((state) => state.show);
  return {
    success: (message: string) => show("success", message),
    error: (message: string) => show("error", message),
  };
}
