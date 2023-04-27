const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
