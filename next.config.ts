import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  experimental: {
    serverActions: {
      allowedOrigins: [
        'ideal-telegram-5gprp64g7679fpx5x-3000.app.github.dev',
        'localhost:3000'
      ],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'placeimg.com',
      },
      {
        protocol: 'https',
        hostname: 'api.escuelajs.com',
      },
    ],
  },
};

export default nextConfig;
