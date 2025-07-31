"use client";
import React from "react";
import { backgroundColorMap } from "../utils/classMapping";
import { useContentfulInspectorMode } from "@contentful/live-preview/react";

// Define the props for the Contentful entry

const DuplexComponent = (entry) => {
  const imgSrc = entry.fields.artistFeatureImage?.fields?.media.fields?.file
    ?.url
    ? `https:${entry.fields.artistFeatureImage?.fields?.media.fields?.file?.url}`
    : "";

  const backgroundColor = entry.fields.backgroundColor || "vinylNeutral";
  const backgroundColorClass =
    backgroundColorMap[backgroundColor] || "vinylNeutral";

  // Enable inspector mode for this entry
  const { getProps } = useContentfulInspectorMode({
    entryId: entry.sys.id,
    locale: "en-US",
  });

  return (
    <section
      {...getProps({ fieldId: "backgroundColor" })}
      className={`p-10 ${backgroundColorClass}`}
    >
      <div className="flex gap-5 justify-between items-center">
        <div>
          test
          <img {...getProps({ fieldId: "artistFeatureImage" })} src={imgSrc} />
        </div>
      </div>
    </section>
  );
};

export default DuplexComponent;
