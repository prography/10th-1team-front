import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // 네이버
      {
        protocol: "https",
        hostname: "*.pstatic.net",
      },
      // 카카오
      {
        protocol: "https",
        hostname: "*.kakao.com",
      },
      {
        protocol: "https",
        hostname: "*.kakaoenterprise.com",
      },
      // 기타
      {
        protocol: "https",
        hostname: "*.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "*.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      // 로컬
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
