"use client";

import { useEffect, useState } from "react";
import { PRIVACY_SECTIONS } from "@/lib/privacy-sections";
import PrivacyArticle from "@/components/privacy/PrivacyArticle";

function ContentsList({
  activeId,
  onNavigate,
}: {
  activeId: string;
  onNavigate?: () => void;
}) {
  return (
    <nav aria-label="Table of contents">
      <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.08em] text-[#8B8D98] md:mb-4">
        Contents
      </p>
      <ul className="flex flex-col gap-0.5">
        {PRIVACY_SECTIONS.map((section) => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={onNavigate}
                className={`block border-l-2 py-1.5 pl-3 text-[13px] leading-snug transition-colors md:text-[14px] ${
                  isActive
                    ? "border-[#0033FF] font-medium text-[#040136]"
                    : "border-transparent text-[#5F6368] hover:border-[#DADCE0] hover:text-[#040136]"
                }`}
              >
                {section.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function PrivacyPolicy() {
  const [activeId, setActiveId] = useState<string>(PRIVACY_SECTIONS[0].id);
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    const headings = PRIVACY_SECTIONS.map((section) =>
      document.getElementById(section.id)
    ).filter((el): el is HTMLElement => Boolean(el));

    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white font-['Geist'] text-[#040136]">
      <div className="mx-auto max-w-[1120px] px-5 pt-28 pb-16 md:px-10 md:pt-32 md:pb-20 xl:px-8 xl:pt-36 xl:pb-24">
        <header className="mb-8 max-w-[720px] md:mb-10 xl:mb-12">
          <p className="mb-3 text-[13px] font-medium text-[#8B8D98] md:text-[14px]">
            STARIX INNOVATIVE SOLUTIONS LIMITED
          </p>
          <h1 className="text-[32px] font-medium leading-[1.15] tracking-[-0.03em] text-[#040136] md:text-[40px] xl:text-[44px]">
            Privacy Policy
          </h1>
          <p className="mt-3 text-[14px] text-[#8B8D98] md:mt-4 md:text-[15px]">
            Last updated February 12, 2026
          </p>
        </header>

        <details
          className="mb-8 rounded-xl border border-[#E8EAED] bg-[#FAFAFA] md:hidden"
          open={tocOpen}
          onToggle={(event) =>
            setTocOpen((event.target as HTMLDetailsElement).open)
          }
        >
          <summary className="cursor-pointer list-none px-4 py-3 text-[15px] font-medium text-[#040136]">
            <span className="flex items-center justify-between">
              Jump to a section
              <span className="text-[#8B8D98]">{tocOpen ? "–" : "+"}</span>
            </span>
          </summary>
          <div className="border-t border-[#E8EAED] px-4 py-4">
            <ContentsList
              activeId={activeId}
              onNavigate={() => setTocOpen(false)}
            />
          </div>
        </details>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[220px_minmax(0,1fr)] md:gap-8 xl:grid-cols-[260px_minmax(0,720px)] xl:gap-16">
          <aside className="hidden md:block">
            <div className="sticky top-28 max-h-[calc(100svh-8rem)] overflow-y-auto pr-2 xl:top-32">
              <ContentsList activeId={activeId} />
            </div>
          </aside>

          <div className="min-w-0">
            <PrivacyArticle />
          </div>
        </div>
      </div>
    </div>
  );
}
