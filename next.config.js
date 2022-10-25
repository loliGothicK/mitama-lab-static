/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  exportPathMap: async () => {
    return {
      '/': { page: '/' },
      '/mitamatch-operations': { page: '/mitamatch-operations' },
      '/mitamatch-operations/install-app': {
        page: '/mitamatch-operations/install-app',
      },
      '/mitamatch-operations/getting-started': {
        page: '/mitamatch-operations/getting-started',
      },
      '/mitamatch-operations/features/v0_1_10': {
        page: '/mitamatch-operations/features/v0_1_10',
      },
      '/mitamatch-operations/features/v0_1_11': {
        page: '/mitamatch-operations/features/v0_1_11',
      },
      '/mitamatch-operations/features/v0_1_12': {
        page: '/mitamatch-operations/features/v0_1_12',
      },
      '/mitamatch-operations/features/v0_1_13': {
        page: '/mitamatch-operations/features/v0_1_13',
      },
      '/mitamatch-operations/features/v0_1_14': {
        page: '/mitamatch-operations/features/v0_1_14',
      },
    };
  },
};

module.exports = nextConfig;
