/** @type {import('next').NextConfig} */
const nextConfig = {}
const dns = require('dns')
dns.setDefaultResultOrder('ipv4first')

module.exports = {
  nextConfig,
  images: {
    domains: [process.env.NEXT_PUBLIC_IMAGE_DOMAIN]
  }
}
