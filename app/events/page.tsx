import { Link } from "@heroui/link";

import { eventsList, Event } from "@/config/events";
import { title } from "@/components/primitives";

export default function EventsPage() {
  const grouped = eventsList.reduce<Record<number, Event[]>>((acc, event) => {
    (acc[event.year] = acc[event.year] || []).push(event);
    return acc;
  }, {});

  const years = Object.keys(grouped)
    .map((y) => parseInt(y, 10))
    .sort((a, b) => b - a);

  return (
    <div className="px-8 py-4 w-full">
      <h1 className={title()}>Events</h1>
      <p className="my-4 text-default-600">
        Workshops, symposiums, and tutorials organized by the lab.
      </p>

      {years.map((year) => (
        <section key={year} className="my-8">
          <h2 className="text-2xl font-bold mb-4 border-b border-default-200 pb-2">
            {year}
          </h2>
          <ul className="flex flex-col gap-6">
            {grouped[year].map((event) => (
              <li key={event.title + event.venue}>
                <ExpandEvent event={event} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function ExpandEvent({ event }: { event: Event }) {
  return (
    <div className="flex flex-row gap-4">
      <div className="shrink-0 w-28">
        <span className="inline-block text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded bg-default-100 text-default-700">
          {event.kind}
        </span>
      </div>
      <div className="flex-1">
        <Link href={event.link} isExternal>
          <h3 className="font-bold text-lg">{event.title}</h3>
        </Link>
        <p className="text-sm font-semibold pt-1">
          {event.venue} &middot; {event.date}
          {event.location ? ` · ${event.location}` : ""}
        </p>
        {event.description && (
          <p className="text-sm pt-1 text-default-700">{event.description}</p>
        )}
      </div>
    </div>
  );
}
