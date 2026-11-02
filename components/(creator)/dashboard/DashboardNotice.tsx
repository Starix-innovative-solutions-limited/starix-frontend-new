"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDashboardNoticeStore } from "@/store/useDashboardNoticeStore";

export default function DashboardNotice() {
  const notice = useDashboardNoticeStore((state) => state.notice);
  const clear = useDashboardNoticeStore((state) => state.clear);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(clear, 3200);
    return () => window.clearTimeout(timeout);
  }, [notice, clear]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[400] flex justify-center px-4">
      <AnimatePresence mode="wait">
        {notice ? (
          <motion.p
            key={notice.id}
            role="status"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`pointer-events-auto max-w-[min(92vw,420px)] rounded-full px-4 py-2.5 text-center text-[13px] font-medium leading-snug shadow-[0_8px_30px_rgba(16,24,40,0.12)] ${
              notice.type === "error"
                ? "bg-white text-[#ED4956] ring-1 ring-[#FECACA]"
                : "bg-white text-[#101828] ring-1 ring-[#D0D5DD]"
            }`}
          >
            {notice.message}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
