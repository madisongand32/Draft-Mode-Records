"use client";
import React from "react";
import ReferenceFieldMapper from "../../comps/helpers/referenceFieldMapper";
import { useContentfulInspectorMode } from "@contentful/live-preview/react";
import Image from "next/image";

const ArtistPageContent = ({ page }) => {
  const artist = page.fields.artist;
  const artistImage = artist.fields.artistImage;

  const artistInspectorProps = useContentfulInspectorMode({
    entryId: page.artist,
    fieldId: "artist",
  });

  if (!page) {
    return <>No content</>;
  }

  return (
    <>
      <section className="artist-hero">
        <div className="relative w-full h-[75vh]">
          <Image
            // {...artistImageInspectorProps({ fieldId: "artistImage" })}
            src={`https:${artist.fields.artistImage?.fields?.media.fields?.file?.url}`}
            alt={artist.fields.artistName}
            className="object-cover z-0 rounded-2xl border-10 border-black"
            fill
            sizes="100vw"
          />
          <div
            style={{ backgroundColor: "#00000070" }}
            className="absolute inset-0 bg-opacity-40 z-10 rounded-2xl"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center text-white">
            <h1
              {...artistInspectorProps({ fieldId: "artistName" })}
              className="text-6xl font-bold"
            >
              {page.fields.artist.fields.artistName}
            </h1>
          </div>
        </div>
      </section>
      <section className="inner-sections">
        <div className="w-full text-xs">
          <ReferenceFieldMapper
            page={page}
            getSectionInspectorProps={({ entryId, fieldId }) =>
              useContentfulInspectorMode({ entryId, fieldId })
            }
            fields={page?.fields?.sections}
          />
        </div>
      </section>
    </>
  );
};

export default ArtistPageContent;
