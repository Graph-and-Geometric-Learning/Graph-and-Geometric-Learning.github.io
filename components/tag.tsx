"use client";

import { Chip } from "@nextui-org/chip";
import React from "react";

import { Tag } from "@/config/publications";

function PublicationTags({ tags }: { tags: Tag[] }) {
  return (
    <>
      {tags.map((tag) => (
        <PublicationTag key={tag} tag={tag} />
      ))}
    </>
  );
}

function PublicationTag({ tag }: { tag: Tag }) {
  let name;
  let color;

  switch (tag) {
    case Tag.Applications:
      name = "Applications";
      color = "primary";
      break;
    case Tag.TrustworthyAI:
      name = "Trustworthy AI";
      color = "secondary";
      break;
    case Tag.MultiModalFoundationModel:
      name = "Multi-Modal Foundation Model";
      color = "success";
      break;
    case Tag.GraphRepresentationLearning:
      name = "Graph Representation Learning";
      color = "warning";
      break;
  }

  return (
    <>
      <Chip color={ color as any }>{name}</Chip>
    </>
  );
}

export { PublicationTags };
