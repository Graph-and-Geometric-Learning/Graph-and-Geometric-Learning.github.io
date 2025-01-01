"use client";

import { Link } from "@nextui-org/link";
import { useSearchParams } from "next/navigation";

import { publications, Tag } from "@/config/publications";
import { PublicationTags } from "@/components/tag";

function Links({ paper, code, page }: { paper: string, code: string | null; page: string | null }) {
  let links = [];
  if (paper !== null) {
    links.push(<Link href={paper}>paper</Link>);
  }
  if (code !== null) {
    links.push(<Link href={code}>code</Link>)
  }
  return <>{links.reduce((prev, curr) => <>{prev} / {curr}</>)}</>
}

export default function PublicationsPage() {
  const searchParams = useSearchParams();

  const direction = searchParams.get("tag");
  const direction_tag = direction as Tag;
  let publications_filtered = publications;

  if (direction !== null) {
    publications_filtered = publications.filter((publication) =>
      publication.tags.includes(direction_tag),
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
                  <PublicationTags tags={publication.tags} />
                </div>
                <div>
                    {publication.page ? (
                      <Link href={`projects/${publication.page}`}>
                        <h2 className="font-bold text-xl">{publication.title}</h2>
                      </Link>
                    ) : (
                      <h2 className="font-bold text-xl">{publication.title}</h2>
                    )}
                </div>
              </div>
              <div className="flex flex-col mx-4 my-2">
                <p className="pb-1 text-sm font-bold">
                  {publication.venue} &nbsp;&nbsp;&nbsp;  <Links paper={publication.paper} code={publication.code} page={publication.page} />
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
