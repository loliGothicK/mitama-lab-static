/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  // exportPathMap: async () => {
  //   const fs = require('fs');
  //
  //   const posts = fs
  //     .readdirSync('_posts')
  //     .filter((file) => file.endsWith('.md'))
  //     .map((file) => file.slice(0, -3))
  //     .map((slug) => {
  //       return {
  //         [`/posts/${slug}`]: {
  //           page: `/posts/[slug]`,
  //           query: {
  //             slug: slug,
  //           },
  //         },
  //       };
  //     });
  //
  //   return Object.assign(
  //     {
  //       '/': { page: '/' },
  //       '/blog': { page: '/blog' },
  //     },
  //     ...posts,
  //   );
  // },
};

module.exports = nextConfig;
