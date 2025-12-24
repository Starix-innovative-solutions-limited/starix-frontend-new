import { MdMailOutline } from "react-icons/md";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Music,
  Youtube,
  Download,
} from "lucide-react";

import { Variants } from "framer-motion";
import { HiUserGroup, HiUser } from "react-icons/hi";
import { IoSearch, IoStatsChart } from "react-icons/io5";
import { RiHome5Line } from "react-icons/ri";

type Creator = {
  name: string;
  submission: string;
  rank: number;
  metrics: {
    facebook: { value: number; label: string };
    twitter: { value: number; label: string };
    instagram: { value: number; label: string };
    linkedin: { value: number; label: string };
    tiktok: { value: number; label: string };
    youtube: { value: number; label: string };
  };
};

export const sidebarLinks = [
  {
    label: "Home",
    icon: "homeIcon.svg",
    href: "/dashboard",
  },
  {
    label: "Challenges",
    icon: "challengesIcon.svg",
    href: "/challenges",
    badge: {
      hug: 102,
      flag: 26,
    },
  },
  {
    label: "Creator Circles",
    icon: "creatorIcon.svg",
    href: "/creator-circles",
  },
  {
    label: "Portfolio",
    icon: "portfolioIcon.svg",
    href: "/portfolio",
  },
  {
    label: "Analytics",
    icon: "analyticsIcon.svg",
    href: "/analytics",
  },
  {
    label: "Profile",
    icon: "profileIcon.svg",
    href: "/profile",
  },
];

export const categories = [
  "Beauty & Personal Care",
  "Branding & Design",
  "Fashion & Apparel",
  "Health, Wellness & Fitness",
  "Food & Culinary",
  "Technology & Gadgets",
  "Gaming & eSports",
  "Travel, Tourism & Lifestyle",
  "Art, Media & Entertainment",
  "Photography & Videography",
  "Music & Performance",
  "Education & Learning",
  "Finance, Business & Entrepreneurship",
  "DIY, Crafts & Hobbies",
  "Parenting & Family",
  "Sports & Outdoor Activities",
  "Culture & Community",
  "Comedy & Skits",
  "Writing, Books & Literature",
  "Home & Living",
  "Automotive & Mobility",
  "Retail & eCommerce",
  "Real Estate & Property",
  "Events & Experiences",
  "Nonprofits & Social Impact",
  "Others",
];

export const challenges = [
  {
    name: "Paulo pily",
    status: "Active",
    submissions: 500,
    engagements: "8,000",
    budget: "#150,00",
  },
  {
    name: "Paulo pily",
    status: "Active",
    submissions: 500,
    engagements: "8,000",
    budget: "#150,00",
  },
  {
    name: "Paulo pily",
    status: "Active",
    submissions: 500,
    engagements: "8,000",
    budget: "#150,00",
  },
  {
    name: "Paulo pily",
    status: "Active",
    submissions: 500,
    engagements: "8,000",
    budget: "#150,00",
  },
  {
    name: "Malonu",
    status: "Closed",
    submissions: 500,
    engagements: "8,000",
    budget: "#150,00",
  },
];

export const activities = [
  { text: "- Food Entry: 5 new submissions", time: "2 mins ago" },
  { text: "- Paulo pily: 3 submissions awaiting review", time: "2 mins ago" },
  {
    text: "- Fashion Haul: 8 creators joined challenge today",
    time: "2 mins ago",
  },
  { text: "- Paulo pily: Challenge ends in 2 days", time: "2 mins ago" },
];

export const faqCards = [
  {
    title: "Getting Started",
    icon: "/images/faq1.png",
    gradient: "bg-gradient-to-br from-pink-100 to-blue-100",
  },
  {
    title: "Troubleshooting",
    icon: "/images/faq2.png",

    gradient: "bg-gradient-to-br from-blue-100 to-purple-100",
  },
  {
    title: "Expert Zone",
    icon: "/images/faq3.png",
    gradient: "bg-gradient-to-br from-orange-100 to-yellow-100",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

const tableRowVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
      delay: i * 0.05,
    },
  }),
};

export const variants = {
  containerVariants,
  itemVariants,
  headerVariants,
  tableRowVariants,
};

export const creators: Creator[] = [
  {
    name: "Jane Doe",
    submission: "12 submissions",
    rank: 1,
    metrics: {
      facebook: { value: 2000, label: "Likes" },
      twitter: { value: 1800, label: "Tweets" },
      instagram: { value: 2400, label: "Hearts" },
      linkedin: { value: 900, label: "Shares" },
      tiktok: { value: 3000, label: "Views" },
      youtube: { value: 1200, label: "Subs" },
    },
  },
  {
    name: "John Smith",
    submission: "8 submissions",
    rank: 2,
    metrics: {
      facebook: { value: 1500, label: "Likes" },
      twitter: { value: 1000, label: "Tweets" },
      instagram: { value: 1300, label: "Hearts" },
      linkedin: { value: 600, label: "Shares" },
      tiktok: { value: 2500, label: "Views" },
      youtube: { value: 800, label: "Subs" },
    },
  },
  {
    name: "Amaka Johnson",
    submission: "10 submissions",
    rank: 3,
    metrics: {
      facebook: { value: 1700, label: "Likes" },
      twitter: { value: 900, label: "Tweets" },
      instagram: { value: 2100, label: "Hearts" },
      linkedin: { value: 850, label: "Shares" },
      tiktok: { value: 2700, label: "Views" },
      youtube: { value: 950, label: "Subs" },
    },
  },
  {
    name: "Michael Lee",
    submission: "14 submissions",
    rank: 4,
    metrics: {
      facebook: { value: 2500, label: "Likes" },
      twitter: { value: 2200, label: "Tweets" },
      instagram: { value: 2800, label: "Hearts" },
      linkedin: { value: 1100, label: "Shares" },
      tiktok: { value: 3300, label: "Views" },
      youtube: { value: 1400, label: "Subs" },
    },
  },
  {
    name: "Sophia Brown",
    submission: "6 submissions",
    rank: 5,
    metrics: {
      facebook: { value: 1100, label: "Likes" },
      twitter: { value: 850, label: "Tweets" },
      instagram: { value: 1600, label: "Hearts" },
      linkedin: { value: 500, label: "Shares" },
      tiktok: { value: 2200, label: "Views" },
      youtube: { value: 700, label: "Subs" },
    },
  },
  {
    name: "Emeka Obi",
    submission: "11 submissions",
    rank: 6,
    metrics: {
      facebook: { value: 1900, label: "Likes" },
      twitter: { value: 1750, label: "Tweets" },
      instagram: { value: 2300, label: "Hearts" },
      linkedin: { value: 950, label: "Shares" },
      tiktok: { value: 2600, label: "Views" },
      youtube: { value: 1100, label: "Subs" },
    },
  },
  {
    name: "Lisa Kim",
    submission: "7 submissions",
    rank: 7,
    metrics: {
      facebook: { value: 1300, label: "Likes" },
      twitter: { value: 1000, label: "Tweets" },
      instagram: { value: 1500, label: "Hearts" },
      linkedin: { value: 600, label: "Shares" },
      tiktok: { value: 2100, label: "Views" },
      youtube: { value: 850, label: "Subs" },
    },
  },
  {
    name: "David Okoro",
    submission: "5 submissions",
    rank: 8,
    metrics: {
      facebook: { value: 900, label: "Likes" },
      twitter: { value: 700, label: "Tweets" },
      instagram: { value: 1200, label: "Hearts" },
      linkedin: { value: 400, label: "Shares" },
      tiktok: { value: 1800, label: "Views" },
      youtube: { value: 600, label: "Subs" },
    },
  },
  {
    name: "Isabella Rossi",
    submission: "13 submissions",
    rank: 9,
    metrics: {
      facebook: { value: 2100, label: "Likes" },
      twitter: { value: 1900, label: "Tweets" },
      instagram: { value: 2600, label: "Hearts" },
      linkedin: { value: 1000, label: "Shares" },
      tiktok: { value: 3200, label: "Views" },
      youtube: { value: 1500, label: "Subs" },
    },
  },
  {
    name: "Olu Jacobs",
    submission: "9 submissions",
    rank: 10,
    metrics: {
      facebook: { value: 1600, label: "Likes" },
      twitter: { value: 1300, label: "Tweets" },
      instagram: { value: 1800, label: "Hearts" },
      linkedin: { value: 700, label: "Shares" },
      tiktok: { value: 2400, label: "Views" },
      youtube: { value: 950, label: "Subs" },
    },
  },
  {
    name: "Grace Miller",
    submission: "4 submissions",
    rank: 11,
    metrics: {
      facebook: { value: 800, label: "Likes" },
      twitter: { value: 600, label: "Tweets" },
      instagram: { value: 1000, label: "Hearts" },
      linkedin: { value: 350, label: "Shares" },
      tiktok: { value: 1600, label: "Views" },
      youtube: { value: 500, label: "Subs" },
    },
  },
  {
    name: "Kwame Mensah",
    submission: "15 submissions",
    rank: 12,
    metrics: {
      facebook: { value: 2300, label: "Likes" },
      twitter: { value: 2100, label: "Tweets" },
      instagram: { value: 2900, label: "Hearts" },
      linkedin: { value: 1200, label: "Shares" },
      tiktok: { value: 3500, label: "Views" },
      youtube: { value: 1600, label: "Subs" },
    },
  },
  {
    name: "Chika Eze",
    submission: "6 submissions",
    rank: 13,
    metrics: {
      facebook: { value: 1000, label: "Likes" },
      twitter: { value: 900, label: "Tweets" },
      instagram: { value: 1400, label: "Hearts" },
      linkedin: { value: 500, label: "Shares" },
      tiktok: { value: 1900, label: "Views" },
      youtube: { value: 650, label: "Subs" },
    },
  },
  {
    name: "Ahmed Farouk",
    submission: "10 submissions",
    rank: 14,
    metrics: {
      facebook: { value: 1700, label: "Likes" },
      twitter: { value: 1500, label: "Tweets" },
      instagram: { value: 2000, label: "Hearts" },
      linkedin: { value: 800, label: "Shares" },
      tiktok: { value: 2500, label: "Views" },
      youtube: { value: 1000, label: "Subs" },
    },
  },
  {
    name: "Maya Torres",
    submission: "9 submissions",
    rank: 15,
    metrics: {
      facebook: { value: 1550, label: "Likes" },
      twitter: { value: 1300, label: "Tweets" },
      instagram: { value: 1750, label: "Hearts" },
      linkedin: { value: 650, label: "Shares" },
      tiktok: { value: 2100, label: "Views" },
      youtube: { value: 900, label: "Subs" },
    },
  },
];

export enum AuthBgEnum {
  CREATOR = "creator",
  BRAND = "brand",
  None = "none",
}
