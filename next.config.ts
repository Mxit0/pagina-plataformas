/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true, // Puedes descomentar esto si lo necesitas
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;