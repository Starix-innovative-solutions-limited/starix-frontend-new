"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";
import { useGetCategories } from "@/hooks/useCategories";

export const DEADLINE_OPTIONS = [
  { label: "Any", days: null },
  { label: "24h", days: 1 },
  { label: "7d", days: 7 },
  { label: "14d", days: 14 },
  { label: "30d", days: 30 },
] as const;

export type ChallengeFilterValues = {
  selectedCategory: string;
  selectedBrand: string;
  selectedStatus: string;
  deadline: string;
  deadlineDays: number | null;
};

export const EMPTY_CHALLENGE_FILTERS: ChallengeFilterValues = {
  selectedCategory: "",
  selectedBrand: "",
  selectedStatus: "",
  deadline: "Any",
  deadlineDays: null,
};

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  values?: ChallengeFilterValues;
  initialValues?: ChallengeFilterValues;
  onChange?: (values: ChallengeFilterValues) => void;
  onSave?: (values: ChallengeFilterValues) => void;
  availableCategories?: string[];
  availableBrands?: string[];
  availableStatuses?: Array<{ value: string; label: string }>;
  showDeadline?: boolean;
  showCategory?: boolean;
}

function withDeadlineLabel(values: ChallengeFilterValues): ChallengeFilterValues {
  return {
    ...values,
    deadline:
      DEADLINE_OPTIONS.find((option) => option.days === values.deadlineDays)
        ?.label ?? "Any",
  };
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-2.5 py-1 text-[11px] font-medium capitalize transition ${
        active
          ? "bg-[#0033FF] text-white"
          : "bg-[#F5F6F8] text-[#62636C] hover:bg-[#EEF3FF] hover:text-[#0033FF]"
      }`}
    >
      {label}
    </button>
  );
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  values,
  initialValues,
  onChange,
  onSave,
  availableCategories,
  availableBrands = [],
  availableStatuses = [],
  showDeadline = true,
  showCategory = true,
}) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const { data: allCategories = [] } = useGetCategories();
  const [categoryQuery, setCategoryQuery] = useState("");

  const current = values ?? initialValues ?? EMPTY_CHALLENGE_FILTERS;

  const categoryNames = useMemo(() => {
    const source =
      availableCategories && availableCategories.length > 0
        ? availableCategories
        : allCategories.map((category) => category.name);

    return [...new Set(source.map((name) => name.trim()).filter(Boolean))].sort(
      (a, b) => a.localeCompare(b)
    );
  }, [allCategories, availableCategories]);

  const visibleCategories = useMemo(() => {
    const needle = categoryQuery.trim().toLowerCase();
    if (!needle) return categoryNames;
    return categoryNames.filter((name) => name.toLowerCase().includes(needle));
  }, [categoryNames, categoryQuery]);

  const apply = (next: Partial<ChallengeFilterValues>) => {
    const payload = withDeadlineLabel({ ...current, ...next });
    onChange?.(payload);
    onSave?.(payload);
  };

  useEffect(() => {
    if (!isOpen) {
      setCategoryQuery("");
      return;
    }

    const onPointerDown = (event: MouseEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) onClose();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  const hasFilters =
    Boolean(current.selectedCategory) ||
    Boolean(current.selectedBrand) ||
    Boolean(current.selectedStatus) ||
    current.deadlineDays != null;

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: 6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.98 }}
          transition={{ duration: 0.14 }}
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-[280px] rounded-2xl border border-[#EFF0F3] bg-white p-3 shadow-[0_12px_32px_rgba(16,24,40,0.12)]"
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[13px] font-semibold text-[#1E1F24]">Filter</p>
            <div className="flex items-center gap-2">
              {hasFilters ? (
                <button
                  type="button"
                  onClick={() => apply(EMPTY_CHALLENGE_FILTERS)}
                  className="text-[11px] font-medium text-[#0033FF] hover:underline"
                >
                  Clear
                </button>
              ) : null}
              <button
                type="button"
                onClick={onClose}
                className="flex h-6 w-6 items-center justify-center rounded-full text-[#8B8D98] hover:bg-[#F5F6F8] hover:text-[#1E1F24]"
                aria-label="Close filters"
              >
                <FiX size={14} />
              </button>
            </div>
          </div>

          {showDeadline ? (
            <>
              <p className="mb-1.5 text-[11px] font-medium text-[#8B8D98]">
                Ends within
              </p>
              <div className="mb-3 flex flex-wrap gap-1.5">
                {DEADLINE_OPTIONS.map((option) => (
                  <Chip
                    key={option.label}
                    label={option.label}
                    active={current.deadlineDays === option.days}
                    onClick={() => apply({ deadlineDays: option.days })}
                  />
                ))}
              </div>
            </>
          ) : null}

          {showCategory ? (
            <>
              <p className="mb-1.5 text-[11px] font-medium text-[#8B8D98]">
                Category
              </p>
              {categoryNames.length > 8 ? (
                <div className="relative mb-2">
                  <FiSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8B8D98]" size={12} />
                  <input
                    value={categoryQuery}
                    onChange={(event) => setCategoryQuery(event.target.value)}
                    placeholder="Search"
                    className="h-8 w-full rounded-full border border-[#EFF0F3] bg-[#F9F9FB] pl-7 pr-3 text-[11px] text-[#1E1F24] outline-none placeholder:text-[#8B8D98]"
                  />
                </div>
              ) : null}
              <div className="mb-3 flex max-h-36 flex-wrap gap-1.5 overflow-y-auto">
                <Chip
                  label="All"
                  active={!current.selectedCategory}
                  onClick={() => apply({ selectedCategory: "" })}
                />
                {visibleCategories.map((category) => {
                  const active =
                    current.selectedCategory.toLowerCase() ===
                    category.toLowerCase();
                  return (
                    <Chip
                      key={category}
                      label={category}
                      active={active}
                      onClick={() =>
                        apply({ selectedCategory: active ? "" : category })
                      }
                    />
                  );
                })}
                {visibleCategories.length === 0 ? (
                  <p className="px-1 py-1 text-[11px] text-[#8B8D98]">
                    No matching categories
                  </p>
                ) : null}
              </div>
            </>
          ) : null}

          {availableStatuses.length > 0 ? (
            <>
              <p className="mb-1.5 text-[11px] font-medium text-[#8B8D98]">
                Status
              </p>
              <div className="mb-3 flex flex-wrap gap-1.5">
                <Chip
                  label="All"
                  active={!current.selectedStatus}
                  onClick={() => apply({ selectedStatus: "" })}
                />
                {availableStatuses.map((status) => {
                  const active = current.selectedStatus === status.value;
                  return (
                    <Chip
                      key={status.value}
                      label={status.label}
                      active={active}
                      onClick={() =>
                        apply({ selectedStatus: active ? "" : status.value })
                      }
                    />
                  );
                })}
              </div>
            </>
          ) : null}

          {availableBrands.length > 0 ? (
            <>
              <p className="mb-1.5 text-[11px] font-medium text-[#8B8D98]">
                Brand
              </p>
              <div className="flex max-h-28 flex-wrap gap-1.5 overflow-y-auto">
                <Chip
                  label="All"
                  active={!current.selectedBrand}
                  onClick={() => apply({ selectedBrand: "" })}
                />
                {availableBrands.map((brand) => {
                  const active =
                    current.selectedBrand.toLowerCase() === brand.toLowerCase();
                  return (
                    <Chip
                      key={brand}
                      label={brand}
                      active={active}
                      onClick={() =>
                        apply({ selectedBrand: active ? "" : brand })
                      }
                    />
                  );
                })}
              </div>
            </>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default FilterModal;
