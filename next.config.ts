import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com', 'raw.githubusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Mengizinkan semua domain (untuk testing)
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
