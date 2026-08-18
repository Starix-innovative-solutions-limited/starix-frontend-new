"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import {
  FiX,
  FiChevronDown,
  FiCheck,
  FiPlus,
  FiPlay,
  FiHeart,
  FiVideo,
  FiBell,
  FiShoppingBag,
} from "react-icons/fi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { BsFileEarmarkPdf, BsFileEarmarkFill } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { useModal } from "@/hooks/useModal";
import { useCreateChallenge, useFundChallenge, type CreateChallengePayload } from "@/hooks/useChallenges";
import { useUploadMedia } from "@/hooks/useMedia";
import { useGetCategories } from "@/hooks/useCategories";

const TOTAL_STEPS = 6;
const MAX_MEDIA = 6;
const MAX_MEDIA_BYTES = 20 * 1024 * 1024; // 20MB
const MAX_PDF_BYTES = 50 * 1024 * 1024; // 50MB

const STEP_LABELS = [
  "Add Challenge Information",
  "Additional detail",
  "Submission Requirements",
  "Brief and Sample Content",
  "Reward Configuration",
  "Review & Publish",
];

const OBJECTIVES = [
  { id: "engagement", label: "Engagement", Icon: FiHeart },
  { id: "awareness", label: "Awareness", Icon: HiOutlineSpeakerphone },
  { id: "ugc", label: "User Generated Content", Icon: FiVideo },
  { id: "product_launch", label: "Product Launch", Icon: FiBell },
  { id: "sales", label: "Sales", Icon: FiShoppingBag },
] as const;

const CONTENT_TYPES = [
  { id: "short_form_video", label: "Short-form Video" },
  { id: "reel", label: "Reel" },
  { id: "image", label: "Image" },
  { id: "carousel", label: "Carousel" },
];

const SUBMITTER_OPTIONS = [
  { id: "anyone", label: "Anyone. Both Creators and Creator Circles." },
  { id: "circles", label: "Creator circles only." },
  { id: "creators", label: "Individual creators only." },
] as const;

const PLATFORM_OPTIONS = ["TikTok", "Instagram", "YouTube"] as const;

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
  objective: "engagement",
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

    if (current === 1) {
      if (form.title.trim().length < 3) {
        errors.title = "Challenge title must be at least 3 characters";
      }
      if (form.description.trim().length < 10) {
        errors.description = "Description must be at least 10 characters";
      }
      if (!form.objective) {
        errors.objective = "Select a campaign objective";
      }
    }

    if (current === 2) {
      if (!form.start_date) errors.start_date = "Start date is required";
      if (!form.end_date) errors.end_date = "End date is required";
      if (form.start_date && form.end_date && form.end_date < form.start_date) {
        errors.end_date = "End date must be after start date";
      }
      if (form.platforms.length === 0) {
        errors.platforms = "Select at least one platform";
      }
    }

    if (current === 3) {
      if (!form.content_type) errors.content_type = "Select a content type";
    }

    if (current === 4) {
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
      // Document is optional — errors don't block continue, but clear blocking upload
    }

    if (current === 5) {
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
      product_launch: "virality",
      sales: "conversions",
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
    if (!isDraft && !validateStep(5)) return;

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

  return (
    <div className="relative w-[min(92vw,520px)] rounded-[24px] bg-white p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] md:p-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[22px] font-bold leading-tight text-[#101828] md:text-[24px]">
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
        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-6">
            <Field label="Challenge Title" error={fieldErrors.title}>
              <input
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="e.g summer sale"
                className={inputClass}
              />
            </Field>

            <Field label="Description" error={fieldErrors.description}>
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
                          ? "border-[#0033FF] bg-[#EAF1FF] text-[#0033FF]"
                          : "border-[#BFDBFE] bg-white text-[#344054] hover:bg-[#F8FAFF]"
                      }`}
                    >
                      <Icon size={16} />
                      {label}
                    </button>
                  );
                })}
              </div>
            </Field>

            <FooterActions step={step} onBack={back} onContinue={next} />
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-7">
            <Field label="Who can submit to this Challenge?">
              <div className="space-y-3">
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
              <Field label="Start Date" error={fieldErrors.start_date}>
                <input
                  type="date"
                  value={form.start_date}
                  onChange={(e) => update("start_date", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="End Date" error={fieldErrors.end_date}>
                <input
                  type="date"
                  value={form.end_date}
                  onChange={(e) => update("end_date", e.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>

            <Field
              label="Who platform(s) should creators post their submissions?"
              error={fieldErrors.platforms}
            >
              <div className="space-y-3">
                {PLATFORM_OPTIONS.map((platform) => {
                  const checked = form.platforms.includes(platform);
                  return (
                    <label
                      key={platform}
                      className="flex cursor-pointer items-center gap-3"
                    >
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-md border-2 ${
                          checked
                            ? "border-[#0033FF] bg-[#0033FF] text-white"
                            : "border-[#D0D5DD] bg-white"
                        }`}
                      >
                        {checked && <FiCheck size={12} strokeWidth={3} />}
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

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-6">
            <Field label="Content Type" error={fieldErrors.content_type}>
              <div className="relative">
                <select
                  value={form.content_type}
                  onChange={(e) => update("content_type", e.target.value)}
                  className={`${inputClass} appearance-none pr-10`}
                >
                  {CONTENT_TYPES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#98A2B3]" />
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

            <Field label="Call-to-Action (Optional)">
              <input
                value={form.cta}
                onChange={(e) => update("cta", e.target.value)}
                placeholder="e.g Shop now at Aurora.com"
                className={inputClass}
              />
            </Field>

            <Field label="Posting rules or Mandatory Requirements">
              <textarea
                value={form.posting_rules}
                onChange={(e) => update("posting_rules", e.target.value)}
                placeholder={"1. Posting rule 1\n2. Posting rule 2\n3. Posting rule 3"}
                rows={5}
                className={`${inputClass} resize-none`}
              />
            </Field>

            <FooterActions step={step} onBack={back} onContinue={next} />
          </div>
        )}

        {/* STEP 4 — Brief & Sample Content */}
        {step === 4 && (
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
                  className="flex w-full items-center gap-4 rounded-2xl border border-dashed border-[#D0D5DD] bg-[#FAFAFA] px-5 py-6 text-left transition hover:bg-[#F5F6F8]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#98A2B3] shadow-sm">
                    <FiVideo size={22} />
                  </div>
                  <div>
                    <p className="text-[14px] text-[#101828]">
                      <span className="font-semibold text-[#0033FF]">
                        Click to Upload
                      </span>{" "}
                      or Drag and Drop
                    </p>
                    <p className="mt-1 text-[12px] text-[#98A2B3]">
                      Max Individual Size: 20MB · PNG, IMG or MP4
                    </p>
                  </div>
                </button>
              ) : (
                <div className="rounded-2xl border border-dashed border-[#D0D5DD] bg-[#FAFAFA] p-4">
                  <div className="flex flex-wrap gap-2.5">
                    {mediaItems.map((item) => (
                      <div
                        key={item.id}
                        className="relative h-[72px] w-[72px] overflow-hidden rounded-xl bg-gray-200 sm:h-[80px] sm:w-[80px]"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.preview}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                        {item.type === "video" && item.progress >= 100 && (
                          <span className="absolute bottom-1.5 left-1.5 rounded-full bg-black/55 p-1 text-white">
                            <FiPlay size={10} className="fill-white" />
                          </span>
                        )}
                        {item.progress < 100 && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 text-white">
                            <svg className="mb-1 h-9 w-9 -rotate-90">
                              <circle
                                cx="18"
                                cy="18"
                                r="14"
                                stroke="rgba(255,255,255,0.25)"
                                strokeWidth="3"
                                fill="none"
                              />
                              <circle
                                cx="18"
                                cy="18"
                                r="14"
                                stroke="white"
                                strokeWidth="3"
                                fill="none"
                                strokeDasharray={`${2 * Math.PI * 14}`}
                                strokeDashoffset={`${
                                  2 * Math.PI * 14 * (1 - item.progress / 100)
                                }`}
                                strokeLinecap="round"
                              />
                            </svg>
                            <span className="text-[10px] font-semibold">
                              {item.progress}%
                            </span>
                          </div>
                        )}
                        {item.progress >= 100 && (
                          <button
                            type="button"
                            onClick={() => removeMedia(item.id)}
                            className="absolute right-1 bottom-1 flex h-5 w-5 items-center justify-center rounded-full bg-white/90 text-[#667085] shadow-sm"
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
                        className="flex h-[72px] w-[72px] items-center justify-center rounded-xl border border-[#D0D5DD] bg-white text-[#98A2B3] transition hover:border-[#0033FF] hover:text-[#0033FF] sm:h-[80px] sm:w-[80px]"
                      >
                        <FiPlus size={22} />
                      </button>
                    )}
                  </div>
                </div>
              )}
              {mediaError && <ErrorText>{mediaError}</ErrorText>}
            </Field>

            <Field label="Add a brief or sample doc (optional)">
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

              {/* Idle / Error empty zone */}
              {(doc.status === "idle" || doc.status === "error") && (
                <button
                  type="button"
                  onClick={() => docInputRef.current?.click()}
                  className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[#D0D5DD] bg-[#FAFAFA] px-5 py-10 transition hover:bg-[#F5F6F8]"
                >
                  <BsFileEarmarkPdf size={40} className="text-[#C0C5CE]" />
                  <p className="text-[14px] text-[#101828]">
                    <span className="font-semibold text-[#0033FF] underline underline-offset-2">
                      Click to Upload
                    </span>{" "}
                    or Drag and Drop
                  </p>
                  {doc.status === "error" ? (
                    <p className="text-[13px] font-semibold text-[#F04438]">
                      {doc.message}
                    </p>
                  ) : (
                    <p className="text-[12px] text-[#98A2B3]">
                      PDF of 50MB Max size
                    </p>
                  )}
                </button>
              )}

              {/* Uploading */}
              {doc.status === "uploading" && (
                <div className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[#D0D5DD] bg-[#FAFAFA] px-5 py-10">
                  <div className="relative mb-1 flex h-14 w-14 items-center justify-center">
                    <svg className="absolute inset-0 h-14 w-14 -rotate-90">
                      <circle
                        cx="28"
                        cy="28"
                        r="24"
                        stroke="#E5E7EB"
                        strokeWidth="4"
                        fill="none"
                      />
                      <circle
                        cx="28"
                        cy="28"
                        r="24"
                        stroke="#0033FF"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 24}`}
                        strokeDashoffset={`${
                          2 * Math.PI * 24 * (1 - doc.progress / 100)
                        }`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-[13px] font-semibold text-[#0033FF]">
                      {doc.progress}%
                    </span>
                  </div>
                  <p className="text-[14px] font-medium text-[#101828]">
                    {doc.name}
                  </p>
                  <p className="text-[12px] text-[#98A2B3]">
                    Uploading • {formatBytes(doc.size)}
                  </p>
                </div>
              )}

              {/* Success */}
              {doc.status === "success" && (
                <div className="relative flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[#D0D5DD] bg-[#FAFAFA] px-5 py-10">
                  <button
                    type="button"
                    onClick={clearDoc}
                    className="absolute top-3 right-3 rounded-full p-1 text-[#98A2B3] hover:bg-white hover:text-[#101828]"
                  >
                    <FiX size={16} />
                  </button>
                  <BsFileEarmarkFill size={42} className="text-[#0033FF]" />
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

        {/* STEP 5 — Reward Configuration */}
        {step === 5 && (
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

        {/* STEP 6 */}
        {step === 6 && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-[#EEF0F4] bg-[#F9FAFB] p-5">
              <h3 className="text-[16px] font-semibold text-[#101828]">
                {form.title || "Untitled challenge"}
              </h3>
              <p className="mt-2 line-clamp-3 text-[13px] text-[#667085]">
                {form.description || "No description"}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-[13px]">
                <Meta
                  label="Objective"
                  value={form.objective.replace("_", " ")}
                />
                <Meta
                  label="Prize pool"
                  value={`₦${formatMoney(totalPool)}`}
                />
                <Meta
                  label="Winners"
                  value={`${form.prizes.length}`}
                />
                <Meta
                  label="Samples"
                  value={`${mediaItems.length} media`}
                />
              </div>
            </div>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:justify-end">
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
                onClick={() => handlePublish(true)}
                disabled={loading}
                className="rounded-full border border-[#0033FF] bg-white px-6 py-3 text-[14px] font-semibold text-[#0033FF] transition hover:bg-[#EAF1FF] disabled:opacity-50"
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={() => handlePublish(false)}
                disabled={loading}
                className="rounded-full bg-[#0033FF] px-7 py-3 text-[14px] font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "Publishing..." : "Publish Challenge"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-[#E4E7EC] bg-white px-4 py-3.5 text-[14px] text-[#101828] outline-none placeholder:text-[#98A2B3] focus:border-[#0033FF] focus:ring-2 focus:ring-[#0033FF]/10";

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

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-[#98A2B3]">
        {label}
      </p>
      <p className="mt-0.5 capitalize text-[#344054]">{value}</p>
    </div>
  );
}
