/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co', // El dominio antiguo
      },
      // --- AÑADE ESTOS TRES BLOQUES ---
      {
        protocol: 'https',
        hostname: 'media.ldlc.com', // Para la gráfica
      },
      {
        protocol: 'https',
        hostname: 'media.spdigital.cl', // Para el procesador
      },
      {
        protocol: 'https',
        hostname: 'www.gigabyte.com', // Para el SSD
      },
    ],
  },
};

module.exports = nextConfig;