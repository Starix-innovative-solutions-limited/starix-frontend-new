import Link from "next/link";

const LINKS = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/creator-terms", label: "Creator Terms" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/community-guidelines", label: "Community Guidelines" },
  { href: "/intellectual-property", label: "Copyright" },
];

export default function DashboardSidebarFooter() {
  return (
    <div className="pt-2">
      <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[13px] font-medium text-[#8B8D98] transition-colors hover:text-[#1E1F24]"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <p className="mt-3 text-center text-[12px] font-medium leading-snug text-[#C0C3CE]">
        © {new Date().getFullYear()} Starix Innovative Solutions Ltd. All rights
        reserved.
      </p>
    </div>
  );
}
