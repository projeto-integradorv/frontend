/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // Remove the deprecated 'domains' configuration
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'wellington.thunder.dev.br',
            },
            {
                protocol: 'https',
                hostname: 'example.com',
            },
        ],
    },
};

export default nextConfig;
