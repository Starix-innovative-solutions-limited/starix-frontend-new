// components/OtpInput.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

type OtpInputProps = {
  length?: number; // number of digits (default 6)
  value?: string; // controlled value (optional)
  onChange?: (code: string) => void; // gets full code
  autoFocus?: boolean;
  disabled?: boolean;
  className?: string;
};

export default function OtpInput({
  length = 6,
  value = "",
  onChange,
  autoFocus = true,
  disabled = false,
  className = "",
}: OtpInputProps) {
  const [internalValue, setInternalValue] = useState<string[]>(() => {
    const arr = Array.from({ length }, (_, i) => value[i] ?? "");
    return arr;
  });

  const inputsRef = useRef<Array<HTMLInputElement | null>>(
    Array(length).fill(null)
  );

  useEffect(() => {
    // keep controlled value in sync if parent passes `value`
    if (value && value.length) {
      const arr = Array.from({ length }, (_, i) => value[i] ?? "");
      setInternalValue(arr);
    }
  }, [value, length]);

  useEffect(() => {
    if (autoFocus && inputsRef.current[0]) inputsRef.current[0].focus();
  }, [autoFocus]);

  const getCode = (arr: string[]) => arr.join("").slice(0, length);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const raw = e.target.value;
    // accept only digits and take last char (so typing "12" pastes second)
    const char = raw.replace(/[^0-9]/g, "");
    if (!char) return;

    setInternalValue((prev) => {
      const next = [...prev];
      next[idx] = char.slice(-1);
      // if user typed more than one char (e.g., mobile keyboard), spread
      if (char.length > 1) {
        for (let i = 1; i < char.length && idx + i < length; i++) {
          next[idx + i] = char[i];
        }
      }
      const code = getCode(next);
      onChange?.(code);
      // focus next
      const nextIndex = Math.min(idx + 1, length - 1);
      setTimeout(() => inputsRef.current[nextIndex]?.focus(), 0);
      return next;
    });
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    const key = e.key;
    const target = e.currentTarget;

    if (key === "Backspace") {
      e.preventDefault();
      setInternalValue((prev) => {
        const next = [...prev];
        if (next[idx]) {
          next[idx] = "";
          onChange?.(getCode(next));
          // keep focus here
          setTimeout(() => target.focus(), 0);
        } else {
          // move to previous
          const prevIndex = Math.max(0, idx - 1);
          next[prevIndex] = "";
          onChange?.(getCode(next));
          setTimeout(() => inputsRef.current[prevIndex]?.focus(), 0);
        }
        return next;
      });
    } else if (key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = Math.max(0, idx - 1);
      inputsRef.current[prevIndex]?.focus();
    } else if (key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = Math.min(length - 1, idx + 1);
      inputsRef.current[nextIndex]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData
      .getData("text")
      .replace(/\s+/g, "")
      .replace(/[^0-9]/g, "");
    if (!paste) return;

    setInternalValue((prev) => {
      const next = Array.from({ length }, (_, i) => paste[i] ?? prev[i] ?? "");
      onChange?.(getCode(next));
      // focus last pasted or final
      const focusIndex = Math.min(paste.length - 1, length - 1);
      setTimeout(() => inputsRef.current[focusIndex]?.focus(), 0);
      return next;
    });
  };

  return (
    <div className={`flex gap-2 items-center flex-between ${className}`}>
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={internalValue[i] ?? ""}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          disabled={disabled}
          aria-label={`Digit ${i + 1}`}
          className={`w-12 h-12 md:w-14 md:h-14 text-center text-lg md:text-xl rounded border-[1px] border-[#99999966] bg-[#F5F5F5] focus:outline-none focus:ring-0 focus:border-blue-500`}
        />
      ))}
    </div>
  );
}

/*
USAGE:

import OtpInput from "@/components/OtpInput";

function Page() {
  const [code, setCode] = useState("");

  return (
    <div>
      <OtpInput length={6} value={code} onChange={(c) => setCode(c)} />
      <p>Entered: {code}</p>
    </div>
  );
}
*/
