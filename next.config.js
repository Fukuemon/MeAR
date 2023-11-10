/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.NEXT_PUBLIC_BACKEND_URL
      }
    ]
  }
}

module.exports = {
  nextConfig,
  images: {
    domains: [process.env.NEXT_PUBLIC_IMAGE_DOMAIN]
  },
  domains: [process.env.NEXT_PUBLIC_IMAGE_DOMAIN]
}
