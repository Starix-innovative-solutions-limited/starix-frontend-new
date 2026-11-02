"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import BrandAvatar from "@/components/(brand)/BrandAvatar";
import Loader from "@/components/Loader";
import {
  useGetBrandChallengeSubmissions,
  type BrandSubmissionRow,
} from "@/hooks/useChallenges";

type PlatformTab = "all" | "instagram" | "tiktok" | "youtube";

type SubmissionPost = {
  id: string;
  platform: PlatformTab | "youtube_shorts" | string;
  contentUrl: string;
  coverImageUrl: string | null;
  creatorName: string;
  creatorAvatar: string | null;
  challengeTitle: string;
};

const TABS: { id: PlatformTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "instagram", label: "Instagram" },
  { id: "tiktok", label: "TikTok" },
  { id: "youtube", label: "YouTube" },
];

const platformIcons: Record<string, string> = {
  instagram: "/ig.webp",
  tiktok: "/tt.webp",
  youtube: "/yt.webp",
  youtube_shorts: "/yt.webp",
};

function platformFromUrl(url: string): string {
  const value = url.toLowerCase();
  if (value.includes("instagram.com")) return "instagram";
  if (value.includes("tiktok.com")) return "tiktok";
  if (value.includes("/shorts/")) return "youtube_shorts";
  if (value.includes("youtube.com") || value.includes("youtu.be")) return "youtube";
  return "other";
}

function tabForPlatform(platform: string): PlatformTab | "other" {
  const key = platform.toLowerCase();
  if (key === "youtube_shorts") return "youtube";
  if (key === "instagram" || key === "tiktok" || key === "youtube") {
    return key;
  }
  return "other";
}

function youtubeEmbedId(url: string) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/i
  );
  return match?.[1] ?? null;
}

function instagramEmbedPath(url: string) {
  const match = url.match(/instagram\.com\/(reel|p|tv)\/([A-Za-z0-9_-]+)/i);
  return match ? `${match[1]}/${match[2]}` : null;
}

function tiktokVideoId(url: string) {
  const match = url.match(/\/video\/(\d+)/);
  return match?.[1] ?? null;
}

function embedSrc(url: string, platform: string) {
  const key = platform.toLowerCase();
  if (key === "youtube" || key === "youtube_shorts") {
    const id = youtubeEmbedId(url);
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }
  if (key === "instagram") {
    const path = instagramEmbedPath(url);
    return path ? `https://www.instagram.com/${path}/embed` : null;
  }
  if (key === "tiktok") {
    const id = tiktokVideoId(url);
    return id ? `https://www.tiktok.com/embed/v2/${id}` : null;
  }
  return null;
}

function postsFromRow(row: BrandSubmissionRow, index: number): SubmissionPost[] {
  const creatorName = row.display_name || row.full_name || row.username || "Creator";
  const links =
    row.links?.length
      ? row.links
      : row.content_url
        ? [{ content_url: row.content_url, platform: row.selected_platform }]
        : [];

  return links.map((link, linkIndex) => {
    const platform =
      link.platform ||
      row.selected_platform ||
      platformFromUrl(link.content_url);
    return {
      id: `${row.submission_id || row.user_id || index}-${platform}-${linkIndex}`,
      platform,
      contentUrl: link.content_url,
      coverImageUrl: row.cover_image_url ?? null,
      creatorName,
      creatorAvatar: row.profile_picture_url ?? null,
      challengeTitle: row.challenge_title || "Challenge",
    };
  });
}

function PostViewerModal({
  post,
  onClose,
}: {
  post: SubmissionPost;
  onClose: () => void;
}) {
  const embed = embedSrc(post.contentUrl, post.platform);
  const isDesktop =
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 1024px)").matches;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 px-4">
      <div className="relative w-full max-w-[560px] overflow-hidden rounded-[28px] bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-white/90 p-2 text-[#62636C] hover:text-[#1E1F24]"
          aria-label="Close"
        >
          <FiX size={20} />
        </button>
        <div className="aspect-[4/5] w-full bg-[#0B0B0F]">
          {embed ? (
            <iframe
              src={embed}
              title={`${post.creatorName} submission`}
              className="h-full w-full"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : post.coverImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.coverImageUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[13px] text-white/70">
              Preview unavailable
            </div>
          )}
        </div>
        <div className="space-y-3 p-5">
          <div className="flex items-center gap-3">
            <BrandAvatar
              name={post.creatorName}
              src={post.creatorAvatar}
              className="h-10 w-10"
              letterClassName="text-xs"
            />
            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold text-[#1E1F24]">
                {post.creatorName}
              </p>
              <p className="truncate text-[12px] text-[#747682]">
                {post.challengeTitle}
              </p>
            </div>
          </div>
          <a
            href={post.contentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full bg-[#0033FF] px-4 py-3 text-[13px] font-semibold text-white"
          >
            {isDesktop ? "Watch post in new tab" : "Watch post"}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function BrandSubmissionsGallery({
  challengeId,
  query = "",
}: {
  challengeId?: string | null;
  query?: string;
}) {
  const { rows, isLoading, isError, totalSubmitted } =
    useGetBrandChallengeSubmissions(challengeId);
  const [activeTab, setActiveTab] = useState<PlatformTab>("all");
  const [selected, setSelected] = useState<SubmissionPost | null>(null);
  const search = query.trim().toLowerCase();

  const posts = useMemo(
    () => rows.flatMap((row, index) => postsFromRow(row, index)),
    [rows]
  );

  const visiblePosts = useMemo(
    () =>
      posts.filter((post) => {
        const matchesTab =
          activeTab === "all" || tabForPlatform(post.platform) === activeTab;
        const matchesSearch =
          !search ||
          `${post.creatorName} ${post.challengeTitle} ${post.platform}`
            .toLowerCase()
            .includes(search);
        return matchesTab && matchesSearch;
      }),
    [activeTab, posts, search]
  );

  return (
    <div>
      <div className="mb-6 flex gap-6 overflow-x-auto border-b border-[#F2F4F7]">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-3 text-[14px] font-medium whitespace-nowrap ${
                isActive ? "text-[#101828]" : "text-[#98A2B3]"
              }`}
            >
              {tab.label}
              {isActive ? (
                <span className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-[#0033FF]" />
              ) : null}
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center gap-3 py-16">
          <Loader />
          <p className="text-[13px] text-[#747682]">Loading submissions...</p>
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-red-100 bg-red-50/60 px-6 py-10 text-center">
          <p className="text-[15px] font-semibold text-[#D12B1F]">
            Couldn’t load submissions
          </p>
          <p className="mt-2 text-[13px] text-[#62636C]">
            Refresh the page or open this challenge again.
          </p>
        </div>
      ) : visiblePosts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#E4E7EC] py-16 text-center">
          <p className="text-[16px] font-medium text-[#101828]">
            {search
              ? `No matches for “${query.trim()}”`
              : `No ${activeTab === "all" ? "" : `${TABS.find((tab) => tab.id === activeTab)?.label} `}submissions yet`}
          </p>
          <p className="mt-1 text-[14px] text-[#747682]">
            {totalSubmitted > 0
              ? "Try another platform tab or search."
              : "Posts appear here after creators submit entries to your challenges."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post) => {
            const icon = platformIcons[post.platform.toLowerCase()];
            return (
              <article
                key={post.id}
                className="overflow-hidden rounded-[20px] border border-[#E4E7EC] bg-white"
              >
                <button
                  type="button"
                  onClick={() => setSelected(post)}
                  className="relative block aspect-[4/5] w-full bg-[#F5F6F8]"
                >
                  {post.coverImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.coverImageUrl}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[12px] text-[#747682]">
                      View post
                    </div>
                  )}
                  {icon ? (
                    <span className="absolute top-3 right-3 rounded-full bg-white/90 p-1.5">
                      <Image src={icon} alt="" width={16} height={16} />
                    </span>
                  ) : null}
                </button>
                <div className="space-y-3 p-4">
                  <div className="flex min-w-0 items-center gap-2">
                    <BrandAvatar
                      name={post.creatorName}
                      src={post.creatorAvatar}
                      className="h-8 w-8"
                      letterClassName="text-[10px]"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-semibold text-[#1E1F24]">
                        {post.creatorName}
                      </p>
                      <p className="truncate text-[11px] text-[#747682]">
                        {post.challengeTitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSelected(post)}
                      className="flex-1 rounded-full bg-[#0033FF] px-3 py-2 text-[12px] font-semibold text-white"
                    >
                      View on Starix
                    </button>
                    <a
                      href={post.contentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-full border border-[#8B8D98] px-3 py-2 text-center text-[12px] font-semibold text-[#1E1F24]"
                    >
                      Watch post
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {selected ? (
        <PostViewerModal post={selected} onClose={() => setSelected(null)} />
      ) : null}
    </div>
  );
}
