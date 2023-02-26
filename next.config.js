/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  exportPathMap: async () => {
    return {
      '/': { page: '/' },
    };
  },
};

module.exports = nextConfig;
