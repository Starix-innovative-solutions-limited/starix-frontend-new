/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react";

interface NextProps {
  id?: number; // optional initial step
  onDone?: () => void; // optional callback when finished
  onStepChange?: (stepId: number) => void; // optional callback whenever step changes
}

const NextStep = ({ id, onDone, onStepChange }: NextProps) => {
  const initialItems = useMemo(
    () => [
      { id: 1, text: "Joined a Challenge trough the new tab.", completed: true },
      { id: 2, text: "Post your content trough the joined tab.", completed: true },
      { id: 3, text: "Share It on your personal social media platforms.", completed: false },
      { id: 4, text: "Submit the Public URL(s).", completed: false },
    ],
    []
  );

  const [items, setItems] = useState(initialItems);

  // active step (defaults to the first incomplete step, or given id)
  const [activeId, setActiveId] = useState<number>(() => {
    if (id) return id;
    const firstIncomplete = initialItems.find((x) => !x.completed);
    return firstIncomplete?.id ?? initialItems[0].id;
  });

  // keep in sync if parent passes a new id
  useEffect(() => {
    if (id) setActiveId(id);
  }, [id]);

  const activeIndex = items.findIndex((x) => x.id === activeId);
  const isLast = activeIndex === items.length - 1;

  const goNext = () => {
    setItems((prev) =>
      prev.map((it) => (it.id === activeId ? { ...it, completed: true } : it))
    );

    if (isLast) {
      onDone?.();
      return;
    }

    const nextId = items[activeIndex + 1]?.id;
    if (!nextId) return;

    setActiveId(nextId);
    onStepChange?.(nextId);
  };

  const allCompleted = items.every((x) => x.completed);

  return (
    <div className="bg-white rounded-lg w-full max-md:max-w-[80vw] md:min-w-lg mx-auto min-h-full flex flex-col justify-between">
      {/* Header */}
      <h2 className="text-xl text-center font-medium text-secondary-100 p-4">
        Next Steps
      </h2>

      <div className="p-8">
        {items.map((item: any, i: number) => {
          const isActive = item.id === activeId;

          return (
            <div className="flex items-start gap-3 mb-4" key={i}>
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  isActive ? "bg-secondary-100 border-secondary-100" : "border-gray-300"
                }`}
              >
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              </div>

              <p className={`text-base ${isActive ? "text-secondary-100" : "text-gray-400"}`}>
                {item.text}
              </p>
            </div>
          );
        })}
      </div>

      {/* Continue Button */}
      <div className="p-6 pt-0">
        <button
          type="button"
          onClick={goNext}
          disabled={allCompleted}
          className={`
            w-full rounded-full py-3 text-base font-medium transition-all
            border border-secondary-100
            ${allCompleted
              ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
              : "bg-secondary-100 text-white hover:bg-white hover:text-secondary-100"}
          `}
        >
          {allCompleted ? "Done" : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default NextStep;
