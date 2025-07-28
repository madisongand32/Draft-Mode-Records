"use client";
import React from "react";
import { backgroundColorMap } from "../utils/classMapping";

// Define the props for the Contentful entry

const DuplexComponent = (entry) => {
  const imgSrc = entry.fields.artistFeatureImage?.fields?.media.fields?.file
    ?.url
    ? `https:${entry.fields.artistFeatureImage?.fields?.media.fields?.file?.url}`
    : "";

  const backgroundColor = entry.fields.backgroundColor || "vinylNeutral";
  const backgroundColorClass =
    backgroundColorMap[backgroundColor] || "vinylNeutral";

  return (
    <section className={`p-10 ${backgroundColorClass}`}>
      <div className="flex gap-5 justify-between items-center">
        <div>
          test
          <img src={imgSrc} />
        </div>
      </div>
    </section>
  );
};

export default DuplexComponent;
