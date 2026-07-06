import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "aethery-s3-bucket-295753750949-us-east-2-an.s3.us-east-2.amazonaws.com",
      }
      // {
      //   protocol: "https",
      //   hostname: "**", // Fallback for any other domains, though specific is better
      // }
    ],
    unoptimized: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // the project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
