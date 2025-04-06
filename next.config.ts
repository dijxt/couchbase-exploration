/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // On désactive les lint pour l'exemple
    eslint: {
        ignoreDuringBuilds: true,
    },
    // Ajout d'une config pour utiliser le transpileur SWC avec React
    swcMinify: true,
};
module.exports = nextConfig;