import 'katex/dist/katex.min.css'

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="flex items-start justify-center gap-4">
            <div className="inline-block max-w-full justify-items-center text-left justify-center space-y-4">
                {children}
            </div>
        </section>
    );
}
