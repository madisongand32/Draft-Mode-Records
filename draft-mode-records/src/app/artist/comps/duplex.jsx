"use client";
import React from "react";
import { backgroundColorMap } from "../../utils/classMapping";
// Define the props for the Contentful entry

const DuplexComponent = (entry, page) => {
  const { duplexInspectorProps, artistInspectorProps } = entry;
  const imgSrc = entry.fields.artistFeatureImage?.fields?.media.fields?.file
    ?.url
    ? `https:${entry.fields.artistFeatureImage?.fields?.media.fields?.file?.url}`
    : "";

  const backgroundColor = entry.fields.backgroundColor || "vinylNeutral";
  const backgroundColorClass =
    backgroundColorMap[backgroundColor] || "vinylNeutral";

  const artist = entry.page.fields.artist;

  console.log(artist);

  // Default to flex-col on mobile, flex-row or flex-row-reverse on md+
  const imageAlignmentClass = entry.fields.imageAlignment
    ? "flex-col md:!flex-row-reverse"
    : "flex-col md:!flex-row";

  return (
    <section className="py-20">
      <div
        className={`flex gap-10 md:gap-20 justify-between items-center ${imageAlignmentClass}`}
      >
        <div className="featured-image-container">
          <img
            {...duplexInspectorProps({ fieldId: "artistFeatureImage" })}
            src={imgSrc}
            alt={entry.fields.altText || "Artist Feature Image"}
            className="shadow-lg"
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="w-full md:w-3/4">
            <p className="text-xs font-bold">About the Artist</p>
            <h2
              {...artistInspectorProps({ fieldId: "artistName" })}
              className="text-5xl font-bold mb-10"
            >
              {artist?.fields.artistName}
            </h2>
            <p
              {...artistInspectorProps({ fieldId: "bio" })}
              className="text-lg"
            >
              {artist?.fields.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DuplexComponent;
