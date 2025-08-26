import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [process.env.NEXT_PUBLIC_API_URL || "http://localhost:3007"],
  /* config options here */
};

export default nextConfig;
