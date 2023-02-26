/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  exportPathMap: async () => {
    return {
      '/': { page: '/' },
      blog: { page: '/blog' },
      'post/preview': { page: '/posts/preview' },
    };
  },
};

module.exports = nextConfig;
