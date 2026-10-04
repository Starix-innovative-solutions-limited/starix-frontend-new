import Link from "next/link";

export default function LegalNoticePage({
  title,
  summary,
}: {
  title: string;
  summary: string;
}) {
  return (
    <div className="min-h-screen bg-white font-['Geist'] text-[#040136]">
      <div className="mx-auto max-w-[720px] px-5 pt-28 pb-16 md:px-10 md:pt-32 md:pb-20 xl:pt-36">
        <p className="mb-3 text-[13px] font-medium text-[#8B8D98] md:text-[14px]">
          STARIX INNOVATIVE SOLUTIONS LIMITED
        </p>
        <h1 className="text-[32px] font-medium leading-[1.15] tracking-[-0.03em] md:text-[40px]">
          {title}
        </h1>
        <p className="mt-6 text-[15px] leading-[1.75] text-[#5F6368] md:text-[16px]">
          {summary}
        </p>
        <p className="mt-6 text-[15px] leading-[1.75] text-[#5F6368] md:text-[16px]">
          For questions, email{" "}
          <a
            href="mailto:contact@starixapp.com"
            className="text-[#0033FF] underline decoration-[#0033FF]/30 underline-offset-2"
          >
            contact@starixapp.com
          </a>{" "}
          or visit our{" "}
          <Link
            href="/contact"
            className="text-[#0033FF] underline decoration-[#0033FF]/30 underline-offset-2"
          >
            Contact
          </Link>{" "}
          page.
        </p>
      </div>
    </div>
  );
}
