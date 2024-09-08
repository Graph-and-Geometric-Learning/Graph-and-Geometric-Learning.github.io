import { title } from "@/components/primitives";
import { publications } from "@/config/publications";
import { ApplicationTag } from "@/components/tag";
import { Chip } from "@nextui-org/chip";

export default function PublicationsPage() {
  return (
    <div>
      <ul>
        {publications.map((publication) => (
          <li key={publication.title}>
            [{publication.venue}] {publication.title}. {publication.authors}. 

            <ApplicationTag />
          </li>
        ))}
      </ul>
    </div>
  );
}
