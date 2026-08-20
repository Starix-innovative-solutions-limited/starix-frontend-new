"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type DragEvent,
  type ReactNode,
} from "react";
import {
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiPlay,
  FiInfo,
  FiImage,
} from "react-icons/fi";
import { BsFileEarmarkPdf, BsFileEarmarkFill } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { useModal } from "@/hooks/useModal";
import { useCreateChallenge, useFundChallenge, type CreateChallengePayload } from "@/hooks/useChallenges";
import { useUploadMedia } from "@/hooks/useMedia";
import { useGetCategories } from "@/hooks/useCategories";

const TOTAL_STEPS = 5;
const MAX_MEDIA = 6;
const MAX_MEDIA_BYTES = 20 * 1024 * 1024; // 20MB
const MAX_PDF_BYTES = 50 * 1024 * 1024; // 50MB

const STEP_LABELS = [
  "Add Challenge Information",
  "Submission Requirements",
  "Brief, Samples and Guidelines",
  "Reward Configuration",
  "Review Challenge",
];

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function IconEngagement({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M8 13.35S2.5 10.1 2.5 6.4A2.9 2.9 0 0 1 8 4.85 2.9 2.9 0 0 1 13.5 6.4C13.5 10.1 8 13.35 8 13.35Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M12.2 2.2v3.2M10.6 3.8h3.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconAwareness({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M8.5 3.5 5.8 5.5H3.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h2.3L8.5 12.5V3.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 5.8a2.4 2.4 0 0 1 0 4.4M12.2 4.3a4.4 4.4 0 0 1 0 7.4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconUgc({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden
    >
      <rect
        x="1.75"
        y="4.25"
        width="8.5"
        height="7.5"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="m10.25 6.8 3.2-1.7v5.8l-3.2-1.7V6.8Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M12.6 1.6v2.8M11.2 3h2.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

const OBJECTIVES = [
  { id: "engagement", label: "Engagement", Icon: IconEngagement },
  { id: "awareness", label: "Awareness", Icon: IconAwareness },
  { id: "ugc", label: "User Generated Content", Icon: IconUgc },
] as const;

const SUBMITTER_OPTIONS = [
  { id: "anyone", label: "Anyone. Both Creators and Creator Circles." },
  { id: "circles", label: "Creator circles only." },
  { id: "creators", label: "Individual creators only." },
] as const;

const PLATFORM_OPTIONS = ["TikTok", "Instagram", "YouTube"] as const;

const PLATFORM_ICONS: Record<string, string> = {
  YouTube: "/yt.svg",
  Instagram: "/ig.svg",
  TikTok: "/tt.svg",
};

const PRIZE_CARD_COLORS = [
  "bg-[#E7F8EF]", // 1st — mint
  "bg-[#E8F1FF]", // 2nd — blue
  "bg-[#F8E8F3]", // 3rd — pink
];

const OPEN_TO_LABELS: Record<(typeof SUBMITTER_OPTIONS)[number]["id"], string> =
  {
    anyone: "Creators & Circles",
    circles: "Creator Circles Only",
    creators: "Creators Only",
  };

const PRIZE_ORDINALS = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"];

type MediaItem = {
  id: string;
  file: File;
  preview: string;
  progress: number;
  type: "image" | "video";
  url?: string;
  error?: string;
};

type DocState =
  | { status: "idle" }
  | { status: "uploading"; name: string; size: number; progress: number }
  | { status: "success"; name: string; size: number; url: string }
  | { status: "error"; message: string; name?: string };

type PrizeRow = { id: string; amount: string };

type FormState = {
  title: string;
  description: string;
  objective: string;
  submitter_type: (typeof SUBMITTER_OPTIONS)[number]["id"];
  start_date: string;
  end_date: string;
  platforms: string[];
  content_type: string;
  hashtags: string;
  mentions: string;
  cta: string;
  posting_rules: string;
  currency: string;
  prize_pool: string;
  prizes: PrizeRow[];
  documents: string[];
};

const initialForm: FormState = {
  title: "",
  description: "",
  objective: "",
  submitter_type: "anyone",
  start_date: "",
  end_date: "",
  platforms: ["TikTok"],
  content_type: "short_form_video",
  hashtags: "",
  mentions: "",
  cta: "",
  posting_rules: "",
  currency: "NGN",
  prize_pool: "",
  prizes: [
    { id: "p1", amount: "" },
    { id: "p2", amount: "" },
    { id: "p3", amount: "" },
  ],
  documents: [],
};

function parseAmount(value: string) {
  return Number(String(value).replace(/[^0-9.]/g, "")) || 0;
}

function formatMoney(value: number) {
  return value.toLocaleString("en-NG");
}

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

/** Parse YYYY-MM-DD as local calendar day (avoids UTC midnight past-date bugs). */
function parseLocalDay(dateStr: string, endOfDay = false) {
  const [y, m, d] = dateStr.split("-").map(Number);
  if (!y || !m || !d) return new Date(NaN);
  return endOfDay
    ? new Date(y, m - 1, d, 23, 59, 59, 999)
    : new Date(y, m - 1, d, 0, 0, 0, 0);
}

/**
 * Fund requires a *future* start_date. Discovery only lists ACTIVE challenges
 * (start already arrived). For publish we nudge start slightly ahead so Flutterwave
 * checkout can finish, then the webhook lands after start → status becomes active.
 */
function resolveChallengeDates(
  startStr: string,
  endStr: string,
  forPublish: boolean
) {
  let start = parseLocalDay(startStr, false);
  let end = parseLocalDay(endStr, true);
  const now = Date.now();

  if (forPublish) {
    const minStart = new Date(now + 45_000);
    if (!Number.isFinite(start.getTime()) || start.getTime() <= minStart.getTime()) {
      start = minStart;
    }
    if (!Number.isFinite(end.getTime()) || end.getTime() <= start.getTime()) {
      end = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000);
    }
  }

  return {
    start_date: start.toISOString(),
    end_date: end.toISOString(),
  };
}

function isAllowedMedia(file: File) {
  return (
    file.type.startsWith("image/") ||
    file.type === "video/mp4" ||
    file.type.startsWith("video/")
  );
}

const inputClass =
  "w-full rounded-xl border border-[#E4E7EC] bg-white px-4 py-3.5 text-[14px] text-[#101828] outline-none placeholder:text-[#98A2B3] focus:border-[#0033FF] focus:ring-2 focus:ring-[#0033FF]/10";

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mt-5 flex gap-1.5">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div
          key={i}
          className={`h-[3px] flex-1 rounded-full transition-colors ${
            i < step ? "bg-[#0033FF]" : "bg-[#E5E7EB]"
          }`}
        />
      ))}
    </div>
  );
}

function FooterActions({
  step,
  loading,
  disabled,
  onBack,
  onContinue,
}: {
  step: number;
  loading?: boolean;
  disabled?: boolean;
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="mt-8 flex items-center justify-end gap-3">
      {step > 1 && (
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="rounded-full border border-[#D0D5DD] bg-white px-6 py-3 text-[14px] font-semibold text-[#101828] transition hover:bg-gray-50 disabled:opacity-50"
        >
          Back
        </button>
      )}
      <button
        type="button"
        onClick={onContinue}
        disabled={loading || disabled}
        className="rounded-full bg-[#0033FF] px-6 py-3 text-[14px] font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Please wait..." : "Continue"}
      </button>
    </div>
  );
}

function ErrorText({ children }: { children: ReactNode }) {
  return <p className="mt-2 text-[13px] font-medium text-[#F04438]">{children}</p>;
}

function toIsoDate(year: number, monthIndex: number, day: number) {
  const m = String(monthIndex + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

function formatDisplayDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return "";
  return `${d}/${m}/${y}`;
}

function formatTimelineDate(iso: string) {
  if (!iso) return "—";
  const date = parseLocalDay(iso);
  if (!Number.isFinite(date.getTime())) return "—";
  const day = String(date.getDate()).padStart(2, "0");
  const month = MONTHS[date.getMonth()];
  return `${day} ${month}, ${date.getFullYear()}`;
}

function formatChallengeDuration(startIso: string, endIso: string) {
  if (!startIso || !endIso) return "—";
  const start = parseLocalDay(startIso);
  const end = parseLocalDay(endIso, true);
  if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime())) {
    return "—";
  }
  const ms = end.getTime() - start.getTime();
  if (ms < 0) return "—";
  const days = Math.max(1, Math.ceil(ms / (24 * 60 * 60 * 1000)));
  if (days < 7) return `${days} Day${days === 1 ? "" : "s"}`;
  const weeks = Math.round(days / 7);
  if (Math.abs(days - weeks * 7) <= 1) {
    return `${weeks} Week${weeks === 1 ? "" : "s"}`;
  }
  return `${days} Days`;
}

function DateField({
  label,
  value,
  onChange,
  error,
  open,
  onOpen,
  onClose,
}: {
  label: string;
  value: string;
  onChange: (iso: string) => void;
  error?: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const initial = value ? parseLocalDay(value) : new Date();
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    if (value) {
      const d = parseLocalDay(value);
      if (Number.isFinite(d.getTime())) {
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
      }
    }
  }, [open, value]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [open, onClose]);

  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const selectedDay = value
    ? (() => {
        const d = parseLocalDay(value);
        if (
          d.getFullYear() === viewYear &&
          d.getMonth() === viewMonth
        ) {
          return d.getDate();
        }
        return null;
      })()
    : null;

  return (
    <div ref={rootRef} className="relative">
      <label className="mb-2 block text-[14px] font-semibold text-[#101828]">
        {label}
      </label>
      <button
        type="button"
        onClick={() => (open ? onClose() : onOpen())}
        className={`${inputClass} text-left ${
          open ? "border-[#101828] ring-0" : ""
        } ${!value ? "text-[#98A2B3]" : ""}`}
      >
        {value ? formatDisplayDate(value) : "dd/mm/yyyy"}
      </button>
      {error && <ErrorText>{error}</ErrorText>}

      {open && (
        <div className="absolute top-[calc(100%+8px)] left-0 z-30 w-[min(100vw-48px,280px)] rounded-2xl border border-[#EEF0F4] bg-white p-4 shadow-[0_12px_40px_-12px_rgba(16,24,40,0.18)]">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[14px] font-semibold text-[#101828]">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => {
                  if (viewMonth === 0) {
                    setViewMonth(11);
                    setViewYear((y) => y - 1);
                  } else {
                    setViewMonth((m) => m - 1);
                  }
                }}
                className="rounded-lg p-1.5 text-[#667085] hover:bg-gray-50"
              >
                <FiChevronLeft size={16} />
              </button>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => {
                  if (viewMonth === 11) {
                    setViewMonth(0);
                    setViewYear((y) => y + 1);
                  } else {
                    setViewMonth((m) => m + 1);
                  }
                }}
                className="rounded-lg p-1.5 text-[#667085] hover:bg-gray-50"
              >
                <FiChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="mb-2 grid grid-cols-7 gap-1">
            {WEEKDAYS.map((d) => (
              <span
                key={d}
                className="text-center text-[10px] font-medium text-[#98A2B3]"
              >
                {d}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, idx) => {
              if (!day) {
                return <span key={`e-${idx}`} className="h-8" />;
              }
              const iso = toIsoDate(viewYear, viewMonth, day);
              const isSelected = selectedDay === day;
              const isFirst = day === 1;
              return (
                <button
                  key={iso}
                  type="button"
                  onClick={() => {
                    onChange(iso);
                    onClose();
                  }}
                  className={`flex h-8 w-full items-center justify-center rounded-full text-[13px] transition ${
                    isSelected
                      ? "border-2 border-[#0033FF] font-semibold text-[#0033FF]"
                      : isFirst
                        ? "font-medium text-[#0033FF] hover:bg-[#EAF1FF]"
                        : "text-[#344054] hover:bg-gray-50"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function CircularProgress({
  progress,
  size = 56,
  stroke = 4,
  color = "#0033FF",
  track = "#E5E7EB",
  labelClassName = "text-[13px] font-semibold text-[#0033FF]",
}: {
  progress: number;
  size?: number;
  stroke?: number;
  color?: string;
  track?: string;
  labelClassName?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.min(100, Math.max(0, progress)) / 100);
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        className="absolute inset-0 -rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={track}
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className={labelClassName}>{Math.round(progress)}%</span>
    </div>
  );
}

export default function CreateChallenge({
  onCreated,
}: {
  onCreated?: (challenge: {
    id: string;
    status?: string;
  }) => void;
} = {}) {
  const { close } = useModal();
  const createChallenge = useCreateChallenge();
  const fundChallenge = useFundChallenge();
  const uploadMedia = useUploadMedia();
  const { data: categories = [] } = useGetCategories();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [mediaError, setMediaError] = useState<string | null>(null);
  const [doc, setDoc] = useState<DocState>({ status: "idle" });
  const [rewardError, setRewardError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showInfoBanner, setShowInfoBanner] = useState(true);
  const [openDatePicker, setOpenDatePicker] = useState<"start" | "end" | null>(
    null
  );

  const mediaInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const totalPool = parseAmount(form.prize_pool);

  const prizePercents = useMemo(() => {
    const amounts = form.prizes.map((p) => parseAmount(p.amount));
    if (totalPool <= 0) return form.prizes.map(() => 0);
    return amounts.map((amt) => Math.round((amt / totalPool) * 1000) / 10);
  }, [form.prizes, totalPool]);

  const prizeSum = form.prizes.reduce(
    (sum, p) => sum + parseAmount(p.amount),
    0
  );

  const togglePlatform = (platform: string) => {
    setForm((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const validateStep = (current: number) => {
    const errors: Record<string, string> = {};

    // Step 1 — Challenge info (title, dates, description, objective)
    if (current === 1) {
      if (form.title.trim().length < 3) {
        errors.title = "Challenge title must be at least 3 characters";
      }
      if (!form.start_date) errors.start_date = "Start date is required";
      if (!form.end_date) errors.end_date = "End date is required";
      if (form.start_date && form.end_date && form.end_date < form.start_date) {
        errors.end_date = "End date must be after start date";
      }
      if (form.description.trim().length < 10) {
        errors.description = "Description must be at least 10 characters";
      }
      if (!form.objective) {
        errors.objective = "Select a campaign objective";
      }
    }

    // Step 2 — Submission requirements
    if (current === 2) {
      if (form.platforms.length === 0) {
        errors.platforms = "Select at least one platform";
      }
    }

    // Step 3 — Brief, samples & guidelines
    if (current === 3) {
      if (mediaItems.some((m) => m.progress < 100 && !m.error)) {
        toast.error("Please wait for media uploads to finish");
        return false;
      }
      if (mediaItems.filter((m) => m.url).length === 0) {
        toast.error("Add at least one sample image or video");
        return false;
      }
      if (doc.status === "uploading") {
        toast.error("Please wait for the document upload to finish");
        return false;
      }
    }

    // Step 4 — Rewards
    if (current === 4) {
      if (totalPool <= 0) {
        setRewardError("Enter a valid total reward pool");
        return false;
      }
      if (form.prizes.some((p) => parseAmount(p.amount) <= 0)) {
        setRewardError("Every prize amount must be greater than 0");
        return false;
      }
      if (Math.abs(prizeSum - totalPool) > 0.01) {
        setRewardError(
          `Prize breakdown (₦${formatMoney(prizeSum)}) must equal total pool (₦${formatMoney(totalPool)})`
        );
        return false;
      }
      const pctSum = prizePercents.reduce((a, b) => a + b, 0);
      if (Math.abs(pctSum - 100) > 1) {
        setRewardError("Prize percentages must add up to 100%");
        return false;
      }
      setRewardError(null);
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      toast.error(Object.values(errors)[0]);
      return false;
    }
    return true;
  };

  const next = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleMediaSelect = async (files: FileList | null) => {
    if (!files?.length) return;
    setMediaError(null);

    const remaining = MAX_MEDIA - mediaItems.length;
    if (remaining <= 0) {
      setMediaError("You can upload up to 6 sample images and videos");
      return;
    }

    const selected = Array.from(files).slice(0, remaining);
    if (files.length > remaining) {
      setMediaError("You can upload up to 6 sample images and videos");
    }

    for (const file of selected) {
      if (!isAllowedMedia(file)) {
        setMediaError("Unsupported file format. Upload PNG, JPG or MP4");
        continue;
      }
      if (file.size > MAX_MEDIA_BYTES) {
        setMediaError("Max individual size is 20MB");
        continue;
      }

      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const preview = URL.createObjectURL(file);
      const type = file.type.startsWith("video") ? "video" : "image";

      setMediaItems((prev) => [
        ...prev,
        { id, file, preview, progress: 5, type },
      ]);

      const tick = setInterval(() => {
        setMediaItems((prev) =>
          prev.map((item) =>
            item.id === id && item.progress < 88
              ? { ...item, progress: item.progress + 10 }
              : item
          )
        );
      }, 160);

      try {
        const { public_url } = await uploadMedia.mutateAsync({
          file,
          target: "challenge_sample_media",
        });
        clearInterval(tick);
        setMediaItems((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, progress: 100, url: public_url } : item
          )
        );
      } catch {
        clearInterval(tick);
        // Keep local preview so user can still continue; mark complete
        setMediaItems((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, progress: 100 } : item
          )
        );
      }
    }
  };

  const removeMedia = (id: string) => {
    setMediaItems((prev) => {
      const item = prev.find((m) => m.id === id);
      if (item) URL.revokeObjectURL(item.preview);
      return prev.filter((m) => m.id !== id);
    });
    setMediaError(null);
  };

  const handleDocSelect = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setDoc({
        status: "error",
        message: "Unsupported file format. Upload PDF",
        name: file.name,
      });
      return;
    }

    if (file.size > MAX_PDF_BYTES) {
      setDoc({
        status: "error",
        message: "Couldn't upload file. Try again",
        name: file.name,
      });
      return;
    }

    setDoc({
      status: "uploading",
      name: file.name,
      size: file.size,
      progress: 8,
    });

    const tick = setInterval(() => {
      setDoc((prev) =>
        prev.status === "uploading" && prev.progress < 90
          ? { ...prev, progress: prev.progress + 12 }
          : prev
      );
    }, 180);

    try {
      const { public_url } = await uploadMedia.mutateAsync({
        file,
        target: "challenge_brief",
      });
      clearInterval(tick);
      setDoc({
        status: "success",
        name: file.name,
        size: file.size,
        url: public_url,
      });
      update("documents", [public_url]);
    } catch {
      clearInterval(tick);
      setDoc({
        status: "error",
        message: "Couldn't upload file. Try again",
        name: file.name,
      });
      update("documents", []);
    }
  };

  const clearDoc = () => {
    setDoc({ status: "idle" });
    update("documents", []);
  };

  const updatePrize = (id: string, amount: string) => {
    setForm((prev) => ({
      ...prev,
      prizes: prev.prizes.map((p) => (p.id === id ? { ...p, amount } : p)),
    }));
    setRewardError(null);
  };

  const addPrize = () => {
    if (form.prizes.length >= 10) return;
    setForm((prev) => ({
      ...prev,
      prizes: [
        ...prev.prizes,
        { id: `p${Date.now()}`, amount: "" },
      ],
    }));
    setRewardError(null);
  };

  const removePrize = (id: string) => {
    if (form.prizes.length <= 1) return;
    setForm((prev) => ({
      ...prev,
      prizes: prev.prizes.filter((p) => p.id !== id),
    }));
    setRewardError(null);
  };

  const buildPayload = (forPublish: boolean): CreateChallengePayload => {
    const prizeAmounts = form.prizes.map((p) =>
      Number(parseAmount(p.amount).toFixed(2))
    );
    const pool = Number(totalPool.toFixed(2));

    const sample_media = mediaItems
      .filter((m) => m.url)
      .map((m) => ({
        media_url: m.url as string,
        media_type: m.type,
        original_filename: m.file.name,
      }));

    const platforms = form.platforms
      .map((p) => p.toLowerCase())
      .map((p) => (p === "youtube" ? "youtube" : p));

    const objectiveMap: Record<string, string> = {
      engagement: "quality_engagement",
      awareness: "visibility",
      ugc: "balanced",
      // product_launch: "virality",
      // sales: "conversions",
    };

    const category =
      categories[0]?.name ||
      form.content_type.replace(/_/g, " ") ||
      "lifestyle";

    const briefUrl =
      doc.status === "success" ? doc.url : form.documents[0] || undefined;

    const dates = resolveChallengeDates(
      form.start_date,
      form.end_date,
      forPublish
    );

    return {
      title: form.title.trim(),
      description: form.description.trim(),
      category,
      prize_pool: pool,
      prize_amounts: prizeAmounts,
      start_date: dates.start_date,
      end_date: dates.end_date,
      // Circles-only challenges are excluded from creator discovery feeds.
      submission_eligibility: form.submitter_type,
      currency: form.currency,
      hashtags: form.hashtags.trim() || undefined,
      mentions: form.mentions.trim() || undefined,
      platforms,
      posting_rules: form.posting_rules.trim() || undefined,
      brief_document_url: briefUrl,
      sample_media: sample_media.length ? sample_media : undefined,
      objective: objectiveMap[form.objective] || "balanced",
    };
  };

  const handlePublish = async (isDraft: boolean) => {
    if (!isDraft && !validateStep(4)) return;

    const uploadedMedia = mediaItems.filter((m) => m.url);
    if (!isDraft && uploadedMedia.length === 0) {
      toast.error("Add at least one sample image or video to publish");
      return;
    }

    setLoading(true);
    try {
      const created = await createChallenge.mutateAsync(
        buildPayload(!isDraft)
      );

      onCreated?.({
        id: created.id,
        status: created.status ?? (isDraft ? "draft" : "publishing"),
      });

      if (isDraft) {
        toast.success("Draft saved");
        close();
        return;
      }

      // Publishing requires funding — redirect to Flutterwave (test or live) checkout
      const funded = await fundChallenge.mutateAsync({
        challengeId: created.id,
        callbackUrl:
          typeof window !== "undefined"
            ? `${window.location.origin}/brand/challenges?funded=1&challenge_id=${created.id}`
            : undefined,
      });

      toast.success("Redirecting to Flutterwave to fund & publish...");
      close();
      if (funded?.payment_url) {
        window.location.assign(funded.payment_url);
      } else {
        toast.error("No payment link returned. Challenge saved as draft.");
      }
    } catch (err: unknown) {
      const detail = (err as { response?: { data?: { detail?: unknown } } })
        ?.response?.data?.detail;
      const message =
        typeof detail === "string"
          ? detail
          : Array.isArray(detail)
            ? detail
                .map((d: { msg?: string }) => d?.msg)
                .filter(Boolean)
                .join(", ")
            : "Failed to create challenge";
      toast.error(message || "Failed to create challenge");
    } finally {
      setLoading(false);
    }
  };

  const mediaBusy = mediaItems.some((m) => m.progress < 100);

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="relative w-[min(92vw,520px)] max-h-[min(90vh,860px)] overflow-y-auto rounded-[28px] bg-white p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] md:p-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[22px] font-semibold leading-tight text-[#101828] md:text-[24px]">
            Create Challenge
          </h2>
          <p className="mt-1.5 text-[13px] text-[#667085] md:text-[14px]">
            {STEP_LABELS[step - 1]}
          </p>
        </div>
        <button
          type="button"
          onClick={close}
          className="rounded-full p-1.5 text-[#98A2B3] transition hover:bg-gray-100 hover:text-[#101828]"
          aria-label="Close"
        >
          <FiX size={20} />
        </button>
      </div>

      <ProgressBar step={step} />

      <div className="mt-7">
        {/* STEP 1 — Add Challenge Information */}
        {step === 1 && (
          <div className="space-y-6">
            {showInfoBanner && (
              <div className="flex items-start gap-3 rounded-2xl border border-[#E4E7EC] bg-[#F2F4F7] px-4 py-3.5">
                <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#0033FF] text-white">
                  <FiInfo size={11} strokeWidth={2.5} />
                </span>
                <p className="flex-1 text-[13px] leading-relaxed text-[#667085]">
                  Winners of the challenge will be automatically selected by our
                  system within a week after the Challenge end date.
                </p>
                <button
                  type="button"
                  onClick={() => setShowInfoBanner(false)}
                  className="shrink-0 rounded-full p-0.5 text-[#98A2B3] hover:text-[#101828]"
                  aria-label="Dismiss"
                >
                  <FiX size={16} />
                </button>
              </div>
            )}

            <Field label="Challenge Title" error={fieldErrors.title}>
              <input
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="e.g summer sale"
                className={inputClass}
              />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <DateField
                label="Start Date"
                value={form.start_date}
                onChange={(v) => update("start_date", v)}
                error={fieldErrors.start_date}
                open={openDatePicker === "start"}
                onOpen={() => setOpenDatePicker("start")}
                onClose={() => setOpenDatePicker(null)}
              />
              <DateField
                label="End Date"
                value={form.end_date}
                onChange={(v) => update("end_date", v)}
                error={fieldErrors.end_date}
                open={openDatePicker === "end"}
                onOpen={() => setOpenDatePicker("end")}
                onClose={() => setOpenDatePicker(null)}
              />
            </div>

            <Field label="Challenge Description" error={fieldErrors.description}>
              <textarea
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Describe what you need creators to do.."
                rows={4}
                className={`${inputClass} resize-none`}
              />
            </Field>

            <Field label="Campaign Objective" error={fieldErrors.objective}>
              <div className="flex flex-wrap gap-2.5">
                {OBJECTIVES.map(({ id, label, Icon }) => {
                  const active = form.objective === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => update("objective", id)}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13px] font-medium transition ${
                        active
                          ? "border-[#5B9EFF] bg-[#EAF3FF] text-[#3D8BFF]"
                          : "border-[#B6D4FF] bg-white text-[#5B9EFF] hover:bg-[#F5F9FF]"
                      }`}
                    >
                      <Icon className="shrink-0" />
                      {label}
                    </button>
                  );
                })}
              </div>
            </Field>

            <FooterActions step={step} onBack={back} onContinue={next} />
          </div>
        )}

        {/* STEP 2 — Submission Requirements */}
        {step === 2 && (
          <div className="space-y-7">
            <Field label="Who can submit to this Challenge?">
              <div className="space-y-3.5">
                {SUBMITTER_OPTIONS.map((opt) => {
                  const active = form.submitter_type === opt.id;
                  return (
                    <label
                      key={opt.id}
                      className="flex cursor-pointer items-center gap-3"
                    >
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                          active
                            ? "border-[#0033FF] bg-[#0033FF]"
                            : "border-[#D0D5DD] bg-white"
                        }`}
                      >
                        {active && (
                          <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </span>
                      <input
                        type="radio"
                        className="sr-only"
                        checked={active}
                        onChange={() => update("submitter_type", opt.id)}
                      />
                      <span className="text-[14px] text-[#667085]">
                        {opt.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Required Hashtags">
                <input
                  value={form.hashtags}
                  onChange={(e) => update("hashtags", e.target.value)}
                  placeholder="#SummerGlow #Aurora"
                  className={inputClass}
                />
              </Field>
              <Field label="Required Mentions">
                <input
                  value={form.mentions}
                  onChange={(e) => update("mentions", e.target.value)}
                  placeholder="@aurorabeauty"
                  className={inputClass}
                />
              </Field>
            </div>

            <Field
              label="Who platform(s) should creators post their submissions?"
              error={fieldErrors.platforms}
            >
              <div className="space-y-3.5">
                {PLATFORM_OPTIONS.map((platform) => {
                  const checked = form.platforms.includes(platform);
                  return (
                    <label
                      key={platform}
                      className="flex cursor-pointer items-center gap-3"
                    >
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                          checked
                            ? "border-[#0033FF] bg-[#0033FF]"
                            : "border-[#D0D5DD] bg-white"
                        }`}
                      >
                        {checked && (
                          <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </span>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={() => togglePlatform(platform)}
                      />
                      <span className="text-[14px] text-[#667085]">
                        {platform}
                      </span>
                    </label>
                  );
                })}
              </div>
            </Field>

            <FooterActions step={step} onBack={back} onContinue={next} />
          </div>
        )}

        {/* STEP 3 — Brief, Samples and Guidelines */}
        {step === 3 && (
          <div className="space-y-7">
            <Field label="Upload up to 6 sample Images and Videos">
              <input
                ref={mediaInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp,video/mp4,video/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  handleMediaSelect(e.target.files);
                  e.target.value = "";
                }}
              />

              {mediaItems.length === 0 ? (
                <button
                  type="button"
                  onClick={() => mediaInputRef.current?.click()}
                  onDragOver={onDragOver}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleMediaSelect(e.dataTransfer.files);
                  }}
                  className="flex w-full items-center gap-4 rounded-2xl border border-dashed border-[#D0D5DD] bg-white px-5 py-6 text-left transition hover:bg-[#FAFAFA]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F2F4F7] text-[#98A2B3]">
                    <FiImage size={22} />
                  </div>
                  <div>
                    <p className="text-[14px] text-[#101828]">
                      <span className="font-semibold text-[#0033FF]">
                        Click to Upload
                      </span>{" "}
                      or Drag and Drop
                    </p>
                    <p className="mt-1 text-[12px] text-[#98A2B3]">
                      Max Individual Size: 20MB
                    </p>
                    <p className="text-[12px] text-[#98A2B3]">PNG, IMG or MP4</p>
                  </div>
                </button>
              ) : (
                <div
                  className="rounded-2xl border border-dashed border-[#D0D5DD] bg-white p-4"
                  onDragOver={onDragOver}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleMediaSelect(e.dataTransfer.files);
                  }}
                >
                  <div className="flex flex-wrap gap-2.5">
                    {mediaItems.map((item) => (
                      <div
                        key={item.id}
                        className="relative h-[72px] w-[72px] overflow-hidden rounded-xl bg-gray-200 sm:h-[84px] sm:w-[84px]"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.preview}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                        {item.progress < 100 && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/55">
                            <CircularProgress
                              progress={item.progress}
                              size={44}
                              stroke={3}
                              color="#0033FF"
                              track="rgba(0,51,255,0.15)"
                              labelClassName="text-[10px] font-semibold text-[#0033FF]"
                            />
                          </div>
                        )}
                        {item.type === "video" && item.progress >= 100 && (
                          <span className="absolute bottom-1.5 left-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#0033FF] shadow-sm">
                            <FiPlay size={10} className="ml-0.5 fill-current" />
                          </span>
                        )}
                        {item.progress >= 100 && (
                          <button
                            type="button"
                            onClick={() => removeMedia(item.id)}
                            className="absolute right-1.5 bottom-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#667085] shadow-sm"
                          >
                            <FiX size={12} />
                          </button>
                        )}
                      </div>
                    ))}

                    {mediaItems.length < MAX_MEDIA && (
                      <button
                        type="button"
                        onClick={() => mediaInputRef.current?.click()}
                        className="flex h-[72px] w-[72px] items-center justify-center rounded-xl border border-[#D0D5DD] bg-white text-[#98A2B3] transition hover:border-[#0033FF] hover:text-[#0033FF] sm:h-[84px] sm:w-[84px]"
                      >
                        <FiPlus size={22} />
                      </button>
                    )}
                  </div>
                </div>
              )}
              {mediaError && <ErrorText>{mediaError}</ErrorText>}
            </Field>

            <Field label="Upload your Brief or Brand Guidelines">
              <input
                ref={docInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => {
                  handleDocSelect(e.target.files);
                  e.target.value = "";
                }}
              />

              {(doc.status === "idle" || doc.status === "error") && (
                <button
                  type="button"
                  onClick={() => docInputRef.current?.click()}
                  onDragOver={onDragOver}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleDocSelect(e.dataTransfer.files);
                  }}
                  className="flex min-h-[200px] w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[#D0D5DD] bg-white px-5 py-10 transition hover:bg-[#FAFAFA]"
                >
                  <BsFileEarmarkPdf size={44} className="text-[#C0C5CE]" />
                  <p className="text-[14px] text-[#101828]">
                    <span className="font-semibold text-[#0033FF]">
                      Click to Upload
                    </span>{" "}
                    or Drag and Drop
                  </p>
                  {doc.status === "error" ? (
                    <p className="text-[13px] font-medium text-[#F04438]">
                      {doc.message}
                    </p>
                  ) : (
                    <p className="text-[12px] text-[#98A2B3]">
                      PDF of 50MB Max size
                    </p>
                  )}
                </button>
              )}

              {doc.status === "uploading" && (
                <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[#D0D5DD] bg-white px-5 py-10">
                  <CircularProgress progress={doc.progress} />
                  <p className="mt-1 text-[14px] font-medium text-[#101828]">
                    {doc.name}
                  </p>
                  <p className="text-[12px] text-[#98A2B3]">
                    Uploading • {formatBytes(doc.size)}
                  </p>
                </div>
              )}

              {doc.status === "success" && (
                <div className="relative flex min-h-[200px] w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[#D0D5DD] bg-white px-5 py-10">
                  <button
                    type="button"
                    onClick={clearDoc}
                    className="absolute top-3 right-3 rounded-full p-1 text-[#98A2B3] hover:bg-[#F2F4F7] hover:text-[#101828]"
                  >
                    <FiX size={16} />
                  </button>
                  <BsFileEarmarkFill size={44} className="text-[#0033FF]" />
                  <p className="text-[14px] font-medium text-[#101828]">
                    {doc.name}
                  </p>
                  <p className="text-[12px] text-[#98A2B3]">
                    Uploaded • {formatBytes(doc.size)}
                  </p>
                </div>
              )}
            </Field>

            <FooterActions
              step={step}
              onBack={back}
              onContinue={next}
              disabled={mediaBusy || doc.status === "uploading"}
            />
          </div>
        )}

        {/* STEP 4 — Reward Configuration */}
        {step === 4 && (
          <div className="space-y-6">
            <Field label="Total Reward Pool (₦)">
              <input
                value={form.prize_pool}
                onChange={(e) => {
                  update("prize_pool", e.target.value);
                  setRewardError(null);
                }}
                placeholder="e.g ₦ 1,000,000"
                className={inputClass}
                inputMode="numeric"
              />
            </Field>

            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="text-[14px] font-semibold text-[#101828]">
                  Prize Breakdown
                </span>
                <div className="h-px flex-1 border-t border-dashed border-[#D0D5DD]" />
              </div>

              <div className="space-y-4">
                {form.prizes.map((prize, index) => {
                  const pct = prizePercents[index] || 0;
                  return (
                    <div key={prize.id}>
                      <label className="mb-1.5 block text-[13px] font-medium text-[#344054]">
                        {PRIZE_ORDINALS[index] || `${index + 1}th`} prize
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[14px] text-[#667085]">
                            ₦
                          </span>
                          <input
                            value={prize.amount}
                            onChange={(e) =>
                              updatePrize(prize.id, e.target.value)
                            }
                            placeholder="0"
                            className={`${inputClass} pr-16 pl-8`}
                            inputMode="numeric"
                          />
                          <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[13px] text-[#98A2B3]">
                            {totalPool > 0 ? `${pct}%` : "0%"}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removePrize(prize.id)}
                          disabled={form.prizes.length <= 1}
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E4E7EC] text-[#98A2B3] transition hover:border-[#F04438] hover:text-[#F04438] disabled:opacity-40"
                          aria-label="Remove prize"
                        >
                          <FiX size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={addPrize}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-[#D0D5DD] bg-white py-3 text-[14px] font-semibold text-[#101828] transition hover:bg-gray-50"
              >
                <FiPlus size={16} />
                Add prize
              </button>

              {rewardError && <ErrorText>{rewardError}</ErrorText>}

              {totalPool > 0 && !rewardError && (
                <p className="mt-3 text-[12px] text-[#667085]">
                  Allocated ₦{formatMoney(prizeSum)} of ₦
                  {formatMoney(totalPool)} (
                  {prizePercents.reduce((a, b) => a + b, 0).toFixed(0)}%)
                </p>
              )}
            </div>

            <FooterActions step={step} onBack={back} onContinue={next} />
          </div>
        )}

        {/* STEP 5 — Review Challenge */}
        {step === 5 && (
          <div className="space-y-8">
            {/* Challenge Detail */}
            <section>
              <h3 className="mb-3 text-[15px] font-semibold text-[#101828]">
                Challenge Detail
              </h3>
              <div className="divide-y divide-[#EEF0F4] border-y border-[#EEF0F4]">
                <ReviewRow label="Title" value={form.title || "—"} />
                <ReviewRow
                  label="Duration"
                  value={formatChallengeDuration(
                    form.start_date,
                    form.end_date
                  )}
                />
                <ReviewRow
                  label="Timeline"
                  value={
                    form.start_date && form.end_date
                      ? `${formatTimelineDate(form.start_date)} - ${formatTimelineDate(form.end_date)}`
                      : "—"
                  }
                />
                <ReviewRow
                  label="Objective"
                  value={
                    <span className="inline-flex items-center gap-1.5 font-semibold text-[#101828]">
                      {(() => {
                        const obj = OBJECTIVES.find(
                          (o) => o.id === form.objective
                        );
                        if (!obj) return form.objective || "—";
                        const Icon = obj.Icon;
                        return (
                          <>
                            <Icon className="text-[#667085]" />
                            {obj.label}
                          </>
                        );
                      })()}
                    </span>
                  }
                />
                <ReviewRow
                  label="Hashtags"
                  value={
                    <span className="text-[#667085]">
                      {form.hashtags.trim() || "—"}
                    </span>
                  }
                />
                <ReviewRow
                  label="Open to"
                  value={OPEN_TO_LABELS[form.submitter_type]}
                />
                <ReviewRow
                  label="Platforms"
                  value={
                    form.platforms.length === 0 ? (
                      "—"
                    ) : (
                      <span className="inline-flex items-center gap-2">
                        {form.platforms.map((platform) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={platform}
                            src={PLATFORM_ICONS[platform]}
                            alt={platform}
                            title={platform}
                            className="h-6 w-6 object-contain"
                          />
                        ))}
                      </span>
                    )
                  }
                />
              </div>
            </section>

            {/* Brief, Samples & Guidelines */}
            <section>
              <h3 className="mb-3 text-[15px] font-semibold text-[#101828]">
                Brief, Samples & Guidelines
              </h3>

              <div className="rounded-2xl border border-[#E4E7EC] bg-[#F9FAFB] p-4">
                {doc.status === "success" ? (
                  <div className="mb-3 flex items-center gap-3 rounded-xl bg-white px-3 py-3">
                    <BsFileEarmarkFill
                      size={28}
                      className="shrink-0 text-[#0033FF]"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14px] font-semibold text-[#101828]">
                        {doc.name}
                      </p>
                      <p className="text-[12px] text-[#98A2B3]">
                        Uploaded • {formatBytes(doc.size)}
                      </p>
                    </div>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-full border border-[#D0D5DD] bg-white px-4 py-1.5 text-[13px] font-semibold text-[#101828] transition hover:bg-gray-50"
                    >
                      View
                    </a>
                  </div>
                ) : (
                  <p className="mb-3 text-[13px] text-[#98A2B3]">
                    No brief document uploaded
                  </p>
                )}

                {mediaItems.length > 0 ? (
                  <div className="flex flex-wrap gap-2.5">
                    {mediaItems.map((item) => (
                      <div
                        key={item.id}
                        className="relative h-[64px] w-[64px] overflow-hidden rounded-xl bg-gray-200 sm:h-[72px] sm:w-[72px]"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.preview}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                        {item.type === "video" && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[#0033FF] shadow-sm">
                              <FiPlay
                                size={11}
                                className="ml-0.5 fill-current"
                              />
                            </span>
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[13px] text-[#98A2B3]">No sample media</p>
                )}
              </div>
            </section>

            {/* Reward Configuration */}
            <section>
              <h3 className="mb-3 text-[15px] font-semibold text-[#101828]">
                Reward Configuration
              </h3>
              <div className="mb-4 divide-y divide-[#EEF0F4] border-y border-[#EEF0F4]">
                <ReviewRow
                  label="Total Reward Pool"
                  value={`₦${formatMoney(totalPool)}`}
                />
                <ReviewRow
                  label="Number of Winners"
                  value={`${form.prizes.length}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {form.prizes.map((prize, index) => {
                  const bg =
                    PRIZE_CARD_COLORS[index] || "bg-[#F5F5F5]";
                  const ordinal = PRIZE_ORDINALS[index] || `${index + 1}th`;
                  return (
                    <div
                      key={prize.id}
                      className={`rounded-2xl px-3.5 py-3.5 ${bg}`}
                    >
                      <p className="text-[12px] font-medium text-[#667085]">
                        {ordinal} place
                      </p>
                      <p className="mt-1.5 text-[15px] font-bold text-[#101828]">
                        ₦{formatMoney(parseAmount(prize.amount))}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={back}
                disabled={loading}
                className="rounded-full border border-[#D0D5DD] bg-white px-6 py-3 text-[14px] font-semibold text-[#101828] transition hover:bg-gray-50 disabled:opacity-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => handlePublish(false)}
                disabled={loading}
                className="rounded-full bg-[#0033FF] px-6 py-3 text-[14px] font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "Publishing..." : "Fund to Publish"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: ReactNode;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-[14px] font-semibold text-[#101828]">
        {label}
      </label>
      {children}
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function ReviewRow({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <span className="shrink-0 text-[14px] font-medium text-[#667085]">
        {label}
      </span>
      <div className="min-w-0 text-right text-[14px] font-medium text-[#101828]">
        {value}
      </div>
    </div>
  );
}
