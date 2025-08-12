"use client";
import React from "react";
import { backgroundColorMap } from "../../utils/classMapping";

const FeaturedSongs = (entry, page) => {
  const { inspectorProps, artistInspectorProps } = entry;
  const album = entry.fields.songsToFeature.fields;

  const imgSrc = album.albumCover.fields.media.fields?.file?.url
    ? `https:${album.albumCover.fields.media.fields.file.url}`
    : "";

  const backgroundColor = entry.fields.backgroundColor || "vinylNeutral";
  const backgroundColorClass =
    backgroundColorMap[backgroundColor] || "vinylNeutral";

  const imageAlignmentClass = entry.fields.imageAlignment
    ? "flex-col md:!flex-row-reverse"
    : "flex-col md:!flex-row";

  return (
    <div
      className={`py-20 -mx-20 bg-${backgroundColorClass} ${
        backgroundColorClass === "vinylDark" ||
        backgroundColorClass === "vinylRed"
          ? "text-white"
          : ""
      }`}
    >
      <div
        className={`px-20 flex gap-10 md:gap-20 justify-between items-center ${imageAlignmentClass}`}
      >
        <div className="featured-image-container w-1/4">
          <img
            {...inspectorProps({ fieldId: "albumCover" })}
            src={imgSrc}
            alt={entry.fields.altText || "Album Cover"}
            className="shadow-lg rounded-full h-full"
          />
        </div>
        <div className="w-3/4">
          <h2 className="text-5xl font-bold mb-10">Latest Songs</h2>
          {album.songsInAlbum
            ?.slice(0, entry.fields.songsToShow)
            ?.map((songEntry, index) => {
              const songFields = songEntry?.fields;
              const songId = songFields?.spotifyPlayer;
              const songName = songFields?.songTitle;
              if (!songId) return null;

              return (
                <div
                  key={songId || index}
                  className="list-of-songs w-full my-5"
                >
                  <iframe
                    title={`Spotify Song Player - ${songName}`}
                    src={`https://open.spotify.com/embed/track/${songId}`}
                    width="75%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className={`${
                      backgroundColorClass === "vinylRed"
                        ? "shadow-xl rounded-lg"
                        : ""
                    }`}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default FeaturedSongs;
