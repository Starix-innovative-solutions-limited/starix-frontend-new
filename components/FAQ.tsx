"use client";

import { useState } from "react";
import Link from "next/link";

const FAQ_ITEMS = [
  {
    id: "meaning",
    question: "What does the starix score truly mean?",
    answer:
      "Your Starix Score is a real-time 0–100 measure of creator performance, visibility, and brand readiness. It updates as you join challenges, grow engagement, and stay active on the platform.",
  },
  {
    id: "increase",
    question: "How can I increase my starix score?",
    answer:
      "Join challenges, submit on time, keep your socials connected, and stay active. Consistent work and stronger engagement lift the score over time.",
  },
  {
    id: "significance",
    question: "How is the score significant?",
    answer:
      "Brands use the score to find creators who are ready to represent them. A stronger score helps you stand out on the global leaderboard and get discovered for better challenges.",
  },
  {
    id: "interpret",
    question: "How to interpret my starix score effectively?",
    answer:
      "Think of it as a snapshot, not a verdict. Scores move with your recent work, connected socials, and challenge results. Check the breakdown in analytics to see what is lifting or lowering it.",
  },
  {
    id: "earn",
    question: "How to earn on starix?",
    answer:
      "Enter brand challenges, submit content that matches the brief, and win from the prize pool. Brands fund campaigns; creators get paid when their work is selected.",
  },
  {
    id: "linkedin-instagram",
    question: "Is starix like linkedin or like instagram?",
    answer:
      "Neither. Starix is a challenge marketplace: brands post briefs with prizes, and creators submit content to compete. It is not a social feed and not a jobs board.",
  },
  {
    id: "followers",
    question: "What if I don’t have many followers?",
    answer:
      "Follower count is not the score. You can still join challenges, build a profile, and grow through the work you submit. Quality and consistency matter more than audience size.",
  },
];

function AccordionIcon({ open }: { open: boolean }) {
  return (
    <span className="relative grid h-5 w-5 shrink-0 place-items-center" aria-hidden>
      <span className="absolute h-px w-[18px] bg-[#8B8D98]" />
      <span
        className={`absolute h-[18px] w-px bg-[#8B8D98] transition-opacity duration-200 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
    </span>
  );
}

const ContactButton = ({ className = "" }: { className?: string }) => (
  <Link
    href="/contact"
    className={`h-[48px] items-center rounded-full border border-[#0033FF] px-[22px] text-[16px] font-medium leading-none text-[#0033FF] transition-colors hover:bg-[#0033FF08] md:h-[42px] md:text-[15px] ${className}`}
  >
    Contact Us
  </Link>
);

const FAQ = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="bg-white px-6 py-14 font-['Geist'] md:px-10 md:py-16 xl:px-[80px] xl:py-[88px]">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-start gap-8 md:grid-cols-[240px_minmax(0,1fr)] md:gap-10 xl:grid-cols-[380px_minmax(0,1fr)] xl:gap-[96px]">
        <div>
          <h2 className="font-['Geist'] text-[32px] font-medium leading-[1.1] tracking-[-0.04em] text-[#040136] md:text-[36px] xl:text-[48px] xl:leading-[1.08] xl:tracking-[-0.03em]">
            Frequently
            <br />
            Asked Questions
          </h2>

          <ContactButton className="mt-8 hidden md:inline-flex" />
        </div>

        <div className="w-full">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div key={item.id} className="border-t border-[#EBEBEB] last:border-b">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="flex min-h-[56px] w-full items-center justify-between gap-4 py-4 text-left md:min-h-[64px] md:gap-6 md:py-5 xl:gap-8"
                >
                  <span className="font-['Geist'] text-[16px] font-normal leading-[1.35] tracking-[-0.02em] text-[#8B8D98] md:text-[18px] md:text-[#62636C] xl:text-[32px] xl:leading-none xl:tracking-[-0.04em]">
                    {item.question}
                  </span>
                  <AccordionIcon open={isOpen} />
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] pb-5 opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p className="overflow-hidden pr-8 font-['Geist'] text-[15px] font-normal leading-[1.45] tracking-[-0.02em] text-[#6E6E6E] md:pr-10 md:text-[16px] xl:pr-12 xl:text-[20px] xl:leading-none xl:tracking-[-0.03em]">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <ContactButton className="mt-2 inline-flex w-fit md:hidden" />
      </div>
    </section>
  );
};

export default FAQ;
