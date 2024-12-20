import createMDX from '@next/mdx'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkMdxImages from 'remark-mdx-images'
import remarkGfm from 'remark-gfm'
import rehypeUnwrapImages from 'rehype-unwrap-images'

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
        unoptimized: true,
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
        remarkPlugins: [remarkGfm, remarkMath, remarkMdxImages],
        rehypePlugins: [rehypeKatex, rehypeUnwrapImages],
    },
})
export default withMDX(nextConfig)