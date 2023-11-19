const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/LoliGothick/MitamatchOperations/main/MitamatichOperations/Assets/memoria/**',
      },
    ],
  },
};

module.exports = nextConfig;
