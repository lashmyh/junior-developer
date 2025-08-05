import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/:path*",
      },
    ];
  },
  images: {
    domains: [
      "citizensadvice.org.uk",
      "www.citizensadvice.org.uk",
      "gov.uk",
      "www.gov.uk"
    ],
  },
};

export default nextConfig;
