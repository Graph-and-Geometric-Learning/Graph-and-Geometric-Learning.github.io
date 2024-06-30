export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-6xl text-center justify-center">
        {children}
      </div>
    </section>
  );
}
