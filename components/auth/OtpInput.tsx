"use client";

import React, { useEffect, useRef, useState } from "react";

type OtpInputProps = {
  length?: number;
  value?: string;
  onChange?: (code: string) => void;
  hasError?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  className?: string;
};

export default function OtpInput({
  length = 6,
  value = "",
  onChange,
  hasError = false,
  autoFocus = true,
  disabled = false,
  className = "",
}: OtpInputProps) {
  const [internalValue, setInternalValue] = useState<string[]>(() => 
    Array.from({ length }, (_, i) => value[i] ?? "")
  );

  const RESEND_TIME = 45;
  const [secondsLeft, setSecondsLeft] = useState(RESEND_TIME);
  const inputsRef = useRef<Array<HTMLInputElement | null>>(Array(length).fill(null));

  // Timer logic
  useEffect(() => {
    if (secondsLeft === 0) return;
    const timer = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  // Sync internal state with external 'value' prop safely
  useEffect(() => {
    if (value !== undefined && value !== internalValue.join("")) {
      const arr = Array.from({ length }, (_, i) => value[i] ?? "");
      setInternalValue(arr);
    }
  }, [value, length]);

  useEffect(() => {
    if (autoFocus && inputsRef.current[0]) inputsRef.current[0].focus();
  }, [autoFocus]);

  const getCode = (arr: string[]) => arr.join("").slice(0, length);

  const triggerChange = (nextValue: string[]) => {
    const code = getCode(nextValue);
    // Wrap in setTimeout to prevent "SetState during render" warning
    setTimeout(() => {
      onChange?.(code);
    }, 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const raw = e.target.value;
    // ALLOW letters and numbers, remove everything else
    const char = raw.replace(/[^a-zA-Z0-9]/g, ""); 
    if (!char) return;

    const next = [...internalValue];
    next[idx] = char.slice(-1); // Preserve case — OTPs are case-sensitive alphanumeric

    // Handle character overflow (if user types fast)
    if (char.length > 1) {
      for (let i = 1; i < char.length && idx + i < length; i++) {
        next[idx + i] = char[i];
      }
    }

    setInternalValue(next);
    triggerChange(next);

    // Focus management
    const nextIndex = Math.min(idx + 1, length - 1);
    if (nextIndex !== idx) {
      inputsRef.current[nextIndex]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const next = [...internalValue];
      if (next[idx]) {
        next[idx] = "";
      } else {
        const prevIndex = Math.max(0, idx - 1);
        next[prevIndex] = "";
        inputsRef.current[prevIndex]?.focus();
      }
      setInternalValue(next);
      triggerChange(next);
    } else if (e.key === "ArrowLeft") {
      inputsRef.current[Math.max(0, idx - 1)]?.focus();
    } else if (e.key === "ArrowRight") {
      inputsRef.current[Math.min(length - 1, idx + 1)]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData
      .getData("text")
      .replace(/\s+/g, "")
      .replace(/[^a-zA-Z0-9]/g, ""); // Preserve case — OTPs are case-sensitive
    
    if (!paste) return;

    const next = [...internalValue];
    for (let i = 0; i < paste.length && i < length; i++) {
      next[i] = paste[i];
    }

    setInternalValue(next);
    triggerChange(next);

    const focusIndex = Math.min(paste.length, length - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  return (
    <div className={`flex flex-col gap-2 items-center w-full ${className}`}>
      <div className="flex gap-2 md:gap-3 items-center justify-center w-full">
        {internalValue.map((char, i) => (
          <input
            key={i}
            ref={(el) => { inputsRef.current[i] = el; }}
            // Changed to 'text' to support letters. 'one-time-code' helps iOS auto-fill
            type="text"
            autoComplete="one-time-code"
            maxLength={1}
            value={char}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={handlePaste}
            disabled={disabled}
            className={`h-[76px] w-[68px] rounded-[10px] border bg-white text-center text-[42px] font-semibold text-black outline-none transition-all max-sm:h-[64px] max-sm:w-[52px] max-sm:text-[34px] ${
              hasError
                ? "border-[#D12B1F] focus:border-[#D12B1F]"
                : "border-[#D1D5DB] focus:border-black"
            }`}
          />
        ))}
      </div>
    </div>
  );
}