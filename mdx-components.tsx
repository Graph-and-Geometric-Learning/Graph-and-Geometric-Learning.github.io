import clsx from "clsx";
import { fontMono } from "@/config/fonts";
import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
interface ImageOption {
    scale: number
}

function MarkDownImage(props: any) {
    const [title, optionPart] = props.alt.split('|')
    const option: ImageOption = optionPart ? optionPart.split(",").reduce((acc: any, cur: string) => {
        const [key, value] = cur.split("=")
        acc[key] = value
        return acc
    }, {}) : { scale: 1 }
    const width_scale = 100 * option.scale
    const style = {
        width: `${width_scale}%`,
        height: 'auto',
        margin: '0 auto',
    }
    return (
        <>
        <Image
            width={0}
            height={0}
            sizes="100vw"
            style={style}
            {...(props as ImageProps)}
        />
        <span className="block mx-auto my-2 text-sm text-slate-600 text-center">{title}</span>
        </>
    )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ children }) => <h1 className="font-bold text-5xl text-center">{children}</h1>,
        h2: ({ children }) => <h2 className="font-bold text-3xl text-left">{children}</h2>,
        h3: ({ children }) => <h3 className="font-bold text-2xl text-left">{children}</h3>,
        h4: ({ children }) => <h4 className="font-bold text-xl text-left">{children}</h4>,
        ul: ({ children }) => <ul className="list-disc list-inside">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside">{children}</ol>,
        img: (props) => (
            <MarkDownImage
                {...props}
            />
        ),
        p: ({ children }) => <p>{children}</p>,
        code: ({ children }) => <code className={clsx('font-mono p-4 block', fontMono.variable)}>{children}</code>,
        pre: ({ children, ...props }) => (
            <pre
                className={clsx(
                    'rounded-md shadow-lg overflow-auto',
                    props.className // Preserve any existing className
                )}
                {...props}
            >
                {children}
            </pre>
        ),
        ...components,
    }
}

