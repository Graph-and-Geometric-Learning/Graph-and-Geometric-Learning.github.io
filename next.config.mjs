import createMDX from '@next/mdx'

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

// NOTE: With Turbopack (the default bundler in Next.js 16+), the MDX loader runs
// in a separate worker and its options must be serializable. Pass remark/rehype
// plugins by name (string) rather than as imported function instances — the
// @next/mdx loader resolves the strings itself. Options go in a [name, options]
// tuple.
const withMDX = createMDX({
    // Add markdown plugins here, as desired
    options: {
        remarkPlugins: ['remark-gfm', 'remark-math', 'remark-mdx-images'],
        rehypePlugins: ['rehype-katex', ['rehype-pretty-code', code_options]],
    },
})
export default withMDX(nextConfig)
