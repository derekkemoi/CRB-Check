// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove this line completely:
  // output: 'export',

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    unoptimized: true, // only needed if you're exporting later
  },

  // Optional: disable PWA in dev (you already have this)
  pwa: {
    disable: process.env.NODE_ENV === "development",
  },
};

module.exports = nextConfig;