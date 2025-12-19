"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface DropdownProps {
    trigger: ReactNode;
    children: ReactNode;
    align?: "left" | "right";
    className?: string
}

export default function Dropdown({
    trigger,
    children,
    align = "left",
    className = ""
}: DropdownProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, []);

    return (
        <div ref={ref} className={`relative inline-block ${className}`}>
            {/* Trigger */}
            <div
                onClick={() => setOpen((v) => !v)}
                className="cursor-pointer"
                aria-haspopup="menu"
                aria-expanded={open}
            >
                {trigger}
            </div>

            {/* Menu */}
            {open && (
                <div
                    role="menu"
                    className={`
            absolute z-50 mt-2 min-w-fit
            rounded-lg border border-gray-50  bg-white text-dark-navy/60 shadow-md flex flex-col gap-1.5 py-2 px-5
            animate-in fade-in zoom-in-95 items-start
            ${align === "right" ? "right-0" : "left-0"}
          `}
                >
                    {children}
                </div>
            )}
        </div>
    );
}
