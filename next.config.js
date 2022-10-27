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
        page: '/mitamatch-operations/install-app'
      },
      '/mitamatch-operations/getting-started': {
        page: '/mitamatch-operations/getting-started',
      },
      '/mitamatch-operations/features/v1_0_0': {
        page: '/mitamatch-operations/features/v1_0_0',
      },
    };
  }
};

module.exports = nextConfig;
