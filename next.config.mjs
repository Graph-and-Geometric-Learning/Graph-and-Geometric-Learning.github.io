import createMDX from '@next/mdx'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeStringify from "rehype-stringify";
import remarkMdxImages from 'remark-mdx-images'
import remarkGfm from 'remark-gfm'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import rehypePrettyCode from "rehype-pretty-code";

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

/** @type {import('rehype-pretty-code').Options} */
const code_options = {
    theme: "github-dark-dimmed",
    keepBackground: true
};


const withMDX = createMDX({
    // Add markdown plugins here, as desired
    options: {
        remarkPlugins: [remarkGfm, remarkMath, remarkMdxImages],
        rehypePlugins: [rehypeKatex, [rehypePrettyCode, code_options]],
    },
})
export default withMDX(nextConfig)