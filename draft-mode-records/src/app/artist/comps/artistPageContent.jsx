"use client";
import React from "react";
import { useEffect, useState } from "react";
import ReferenceFieldMapper from "../../comps/helpers/referenceFieldMapper";
import { useContentfulInspectorMode } from "@contentful/live-preview/react";
import Image from "next/image";

const ArtistPageContent = ({ page }) => {
  const artist = page.fields.artist;
  const artistImage = artist.fields.artistImage;
  const [artistID, setArtistID] = useState(null);

  const artistInspectorProps = useContentfulInspectorMode({
    entryId: page.artist,
    fieldId: "artist",
  });

  if (!page) {
    return <>No content</>;
  }

  useEffect(() => {
    async function fetchTopTrackID() {
      // Remove invisible/zero-width and BOM characters
      const cleanName = artist.fields.artistName.replace(
        /[\u200B-\u200D\uFEFF]/g,
        ""
      );
      console.log("Clean Artist Name:", cleanName);
      const res = await fetch(
        `/api/spotify-artist-top-track?artistName=${encodeURIComponent(
          cleanName
        )}`
      );
      const data = await res.json();
      setArtistID(data.topTrackId);
      // console.log("Top Track ID:", data.topTrackId);
    }
    fetchTopTrackID();
  }, [artist.fields.artistName]);

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
      <section className="artist-top-song bg-vinylDark px-20 pt-65 pb-20 -mt-50 -mx-20 text-center">
        <h3 className="text-white text-3xl font-semibold mb-10">Top Song</h3>
        <iframe
          title={`Spotify Song Player - ${artist.fields.artistName} top track`}
          src={`https://open.spotify.com/embed/track/${artistID}`}
          width="75%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="mx-auto"
        />
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
