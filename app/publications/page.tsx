"use client";

import { Link } from "@nextui-org/link";
import { useSearchParams } from "next/navigation";

import { publications } from "@/config/publications";
import { ApplicationTags } from "@/components/tag";

export default function PublicationsPage() {
  const searchParams = useSearchParams();

  const direction = searchParams.get("tag");
  let publications_filtered = publications;

  if (direction !== null) {
    publications_filtered = publications.filter((publication) =>
      publication.tags.includes(direction as any),
    );
  }

  return (
    <div>
      <ul>
        {publications_filtered.map((publication) => (
          <li key={publication.title}>
            <div className="my-4">
              <div className="flex flex-row gap-4">
                <div>
                  <ApplicationTags tags={publication.tags} />
                </div>
                <div>
                  <h2 className="font-bold text-xl">{publication.title}</h2>
                </div>
              </div>
              <div className="flex flex-col mx-4 my-2">
                <p className="pb-1 text-sm font-bold">
                  {publication.venue}, <Link href={publication.code}>code</Link>{" "}
                  / <Link href={publication.paper}>paper</Link>
                </p>
                <p className="pb-1 text-sm">{publication.authors}</p>
                <p className="pb-1">{publication.abstract}</p>
                <p className="pb-1">{publication.impact}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
