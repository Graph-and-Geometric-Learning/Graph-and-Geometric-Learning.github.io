/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: "/lab-website",
    output: "export",
    reactStrictMode: true,
    images: {
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
}

module.exports = nextConfig
