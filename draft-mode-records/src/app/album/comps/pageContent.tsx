"use client";
import React from "react";
// import ReferenceFieldMapper from "./helpers/referenceFieldMapper";
import { Entry, EntryFields } from "contentful";
// import { HeroBannerProps } from "./heroBanner";

export interface PageEntry extends Entry {
  fields: {
    pageTitle: EntryFields.Symbol;
    slug: EntryFields.Symbol;
    sections: EntryFields.Array<HeroBannerProps>;
  };
}
interface PageContentProps {
  page: PageEntry;
}

const PageContent: React.FC<PageContentProps> = ({ page }) => {
  if (!page) {
    return <>No content</>;
  }
  return (
    <div className="w-full text-xs">
      <h1 className="text-4xl mx-auto my-10 px-10">{page.fields.pageTitle}</h1>
      <ReferenceFieldMapper fields={page?.fields?.sections} />
    </div>
  );
};

export default PageContent;
