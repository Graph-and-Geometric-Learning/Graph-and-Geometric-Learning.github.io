export default function Publications({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-start justify-start gap-4 py-8">
      <div className="inline-block max-w-full text-left justify-start">
        {children}
      </div>
    </section>
  );
}
