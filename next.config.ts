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
      },
      {
        protocol: "https",
        hostname: "**", // Fallback for any other domains, though specific is better
      }
    ],
  },
};

export default nextConfig;
