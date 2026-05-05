export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className="inline-block text-left justify-center w-full max-w-5xl">
        {children}
      </div>
    </section>
  );
}
