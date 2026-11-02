"use client";

export default function AuthFormMessage({
  error,
  success,
}: {
  error?: string | null;
  success?: string | null;
}) {
  if (!error && !success) return null;

  return (
    <p
      role="alert"
      className={`text-center text-[14px] leading-snug ${
        error ? "text-[#ED4956]" : "text-[#1E874B]"
      }`}
    >
      {error || success}
    </p>
  );
}
