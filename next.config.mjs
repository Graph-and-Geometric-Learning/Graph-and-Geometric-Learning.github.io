import createMDX from '@next/mdx'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeMdxImportMedia from 'rehype-mdx-import-media'

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    // Configure `pageExtensions` to include MDX files
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    // Optionally, add any other Next.js config below

}

const withMDX = createMDX({
    // Add markdown plugins here, as desired
    options: {
        remarkPlugins: [remarkMath, rehypeMdxImportMedia],
        rehypePlugins: [rehypeKatex],
    },
})
export default withMDX(nextConfig)