"use client";
import React from "react";
import ReferenceFieldMapper from "./helpers/referenceFieldMapper";
import { Entry, EntryFields } from "contentful";
import { DuplexProps } from "../../../lib/contentful/queries";
import { Artist, EntryReference } from "../../../lib/contentful/queries";

export interface ArtistPageEntry extends Entry {
  fields: {
    artist: Artist | EntryReference;
    sections: EntryFields.Array<DuplexProps>;
  };
}
interface ArtistPageContentProps {
  page: ArtistPageEntry;
}

const ArtistPageContent: React.FC<ArtistPageContentProps> = ({ page }) => {
  console.log("Sections:", page.fields.sections);
  if (!page) {
    return <>No content</>;
  }
  return (
    <div className="w-full text-xs">
      {/* <h1 className="text-4xl mx-auto my-10 px-10">{page.fields.pageTitle}</h1> */}
      <ReferenceFieldMapper fields={page?.fields?.sections} />
    </div>
  );
};

export default ArtistPageContent;
