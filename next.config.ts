import type { NextConfig } from "next";

const nextConfig = {
  // ... konfigurasi lain
  images: {
    remotePatterns: [
      // Tambahkan Cloudinary di sini
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },{
        protocol: 'https',
        hostname: 'images.unsplash.com', // Tambahkan Unsplash
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com', // Tambahkan Imgur
      },
      {
        protocol: 'https',
        hostname: 'placehold.co', // Tambahkan Imgur
      },
    ],
  },
}

export default nextConfig;
