/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://luxelair-back-end:4000/:path*", // Proxy to Backend
      },
      {
        source: "/file-hosting/:path*",
        destination: "http://luxelair-file-hosting:5001/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
