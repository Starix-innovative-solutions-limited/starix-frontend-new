import type { NextConfig } from "next";

const apiTarget =
  process.env.API_PROXY_TARGET ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api-dev.starixapp.com";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "starix-images.s3.eu-west-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "starix-images.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    // Same-origin proxy for local/dev so browser CORS doesn't mask API 500s.
    if (!apiTarget.startsWith("http")) return [];
    return [
      {
        source: "/api-backend/:path*",
        destination: `${apiTarget.replace(/\/$/, "")}/:path*`,
      },
    ];
  },
};

export default nextConfig;
