"use client"

import { subtitle, title } from "@/components/primitives";
import { publications, Publication } from "@/config/publications";
import { ApplicationTag } from "@/components/tag";
import { Chip } from "@nextui-org/chip";
import { useSearchParams } from 'next/navigation';


export default function PublicationsPage() {
  const searchParams = useSearchParams()
 
  const direction = searchParams.get('tag')
  let publications_filtered = publications
  if (direction !== null) {
    publications_filtered = publications.filter((publication) => publication.tag === direction);
  }
  return (
    <div>
      <ul>
        {publications_filtered.map((publication) => (
          <li key={publication.title}>
          <div className="p-4">
              <h2 className={subtitle()}>[{publication.venue}] {publication.title} <ApplicationTag tag={publication.tag} /></h2> 
              <p className="pb-2">{publication.authors}</p>
              <p>{publication.abstract}</p>
              <p>{publication.impact}</p>
          </div>

          </li>
        ))}
      </ul>
    </div>
  );
}
