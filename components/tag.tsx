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
      color = "#ffe119";
      break;
    case Tag.TrustworthyAI:
      name = "Trustworthy AI";
      color = "#3cb44b";
      break;
    case Tag.MultiModalFoundationModel:
      name = "Multi-Modal Foundation Model";
      color = "#4363d8";
      break;
    case Tag.GraphRepresentationLearning:
      name = "Graph Representation Learning";
      color = "#f58231";
      break;
  }

  return (
    <>
      <Chip style={{ backgroundColor: color }}>{name}</Chip>
    </>
  );
}

export { PublicationTags };
