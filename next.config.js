/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/_next/image(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable', // Esto permitirá que la imagen se almacene en caché durante un año
                    },
                ],
            },
        ]
    },
};

module.exports = nextConfig;