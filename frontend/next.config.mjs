/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACKEND_URL: process.env.BACKEND_URL, // Disponibiliza a variável de ambiente no client-side
    },
    images: {
        domains: ['res.cloudinary.com'],
      },
};

export default nextConfig;