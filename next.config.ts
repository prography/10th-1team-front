import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ldb-phinf.pstatic.net",
      },
    ],
  },
};

export default nextConfig;
