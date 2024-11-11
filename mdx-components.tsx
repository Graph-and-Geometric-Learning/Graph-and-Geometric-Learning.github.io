import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ children }) => <h1 className="font-bold text-5xl text-center">{children}</h1>,
        ul: ({ children }) => <ul className="list-disc list-inside">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside">{children}</ol>,
        img: (props) => (
            <Image
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
                {...(props as ImageProps)}
            />
        ),
        // p: ({ children }) => <p className="inline">{children}</p>,
        ...components,
    }
}

