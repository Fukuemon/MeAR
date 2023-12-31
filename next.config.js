/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      process.env.NEXT_PUBLIC_IMAGE_DOMAIN,
      process.env.NEXT_PUBLIC_IMAGE_DOMAIN_DETAIL,
      'localhost',
      'imgfp.hotp.jp'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_IMAGE_DOMAIN,
        port: '443',
        pathname: '/avatars/**'
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_IMAGE_DOMAIN,
        port: '443',
        pathname: '/posts/**'
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_IMAGE_DOMAIN,
        port: '443',
        pathname: '/models/**'
      }
    ]
  }
}

module.exports = {
  nextConfig,
  images: {
    domains: [
      process.env.NEXT_PUBLIC_IMAGE_DOMAIN,
      process.env.NEXT_PUBLIC_IMAGE_DOMAIN_DETAIL,
      'localhost',
      'imgfp.hotp.jp'
    ]
  }
}
