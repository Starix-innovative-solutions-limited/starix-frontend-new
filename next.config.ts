import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'starix-images.s3.eu-west-1.amazonaws.com, starix-images.s3.amazonaws.com', 
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;