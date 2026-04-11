"use client";

import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { Chip } from "@heroui/chip";
import { useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";

import { publications, Tag, Publication } from "@/config/publications";
import { PublicationTags } from "@/components/tag";

const allTags = Object.values(Tag);

function Links({ paper, code }: { paper: string; code: string | null }) {
  let links = [];
  if (paper !== null) {
    links.push(<Link key="paper" href={paper}>paper</Link>);
  }
  if (code !== null) {
    links.push(<Link key="code" href={code}>code</Link>);
  }
  return <>{links.reduce((prev, curr) => <span key="sep">{prev} / {curr}</span>)}</>;
}

function matchesSearch(publication: Publication, query: string): boolean {
  const q = query.toLowerCase();
  return (
    publication.title.toLowerCase().includes(q) ||
    publication.authors.toLowerCase().includes(q) ||
    publication.venue.toLowerCase().includes(q) ||
    publication.abstract.toLowerCase().includes(q)
  );
}

export default function PublicationsPage() {
  const searchParams = useSearchParams();
  const directionTag = searchParams.get("tag") as Tag | null;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>(
    directionTag ? [directionTag] : []
  );

  const toggleTag = (tag: Tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
  };

  const filteredPublications = useMemo(() => {
    let result = publications;

    if (selectedTags.length > 0) {
      result = result.filter((pub) =>
        selectedTags.some((tag) => pub.tags.includes(tag))
      );
    }

    if (searchQuery.trim()) {
      result = result.filter((pub) => matchesSearch(pub, searchQuery));
    }

    return result;
  }, [searchQuery, selectedTags]);

  const hasActiveFilters = searchQuery.trim() !== "" || selectedTags.length > 0;

  return (
    <div>
      {/* Search & Filter Section */}
      <div className="mb-8 space-y-4">
        <Input
          isClearable
          placeholder="Search by title, author, venue, or keywords..."
          size="lg"
          value={searchQuery}
          onClear={() => setSearchQuery("")}
          onValueChange={setSearchQuery}
          startContent={
            <svg
              className="w-5 h-5 text-default-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-default-500 mr-1">Filter by topic:</span>
          {allTags.map((tag) => (
            <Chip
              key={tag}
              className="cursor-pointer select-none"
              variant={selectedTags.includes(tag) ? "solid" : "bordered"}
              color={selectedTags.includes(tag) ? "primary" : "default"}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Chip>
          ))}
          {hasActiveFilters && (
            <Chip
              className="cursor-pointer select-none"
              variant="light"
              color="danger"
              onClick={clearFilters}
            >
              Clear all
            </Chip>
          )}
        </div>

        {hasActiveFilters && (
          <p className="text-sm text-default-400">
            Showing {filteredPublications.length} of {publications.length} publications
          </p>
        )}
      </div>

      {/* Publications List */}
      {filteredPublications.length === 0 ? (
        <div className="text-center py-12 text-default-400">
          <p className="text-lg">No publications match your search.</p>
          <p className="text-sm mt-2">Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <ul>
          {filteredPublications.map((publication) => (
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
                    {publication.venue} &nbsp;&nbsp;&nbsp;{" "}
                    <Links
                      paper={publication.paper}
                      code={publication.code}
                    />
                  </p>
                  <p className="pb-1 text-sm">{publication.authors}</p>
                  <p className="pb-1">{publication.abstract}</p>
                  <p className="pb-1">{publication.impact}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
