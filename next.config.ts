import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL((process.env.NEXT_PUBLIC_FAKE_STORE_API as string) + '/**')]
  }
};

export default nextConfig;
