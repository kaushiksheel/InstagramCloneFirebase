/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig =withPWA({
  reactStrictMode: true,
  images:{
    domains:["images.unsplash.com","lh3.googleusercontent.com","firebasestorage.googleapis.com","plus.unsplash.com"]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
})

module.exports = nextConfig
