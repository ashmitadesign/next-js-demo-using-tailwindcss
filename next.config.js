/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'holidayturn.com',
        port: '',
        // pathname: '/account123/**',
      },
    ],
  },
  reactStrictMode: true,
}
