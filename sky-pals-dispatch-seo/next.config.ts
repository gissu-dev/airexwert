import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.skypalsdispatch.com",
          },
        ],
        destination: "https://skypalsdispatch.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
