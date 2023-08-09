const withPWA = require('next-pwa')({
    dest: 'public'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Aquí puedes añadir otras configuraciones de Next.js si lo necesitas
};

module.exports = withPWA(nextConfig);