"use client";

import { FieldAppSDK } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";
import { useEffect, useState } from "react";

type Album = {
  id: string;
  name: string;
  images: { url: string }[];
  artists: { name: string }[];
};

const Field = () => {
  const sdk = useSDK<FieldAppSDK>();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Album[]>([]);
  const [selected, setSelected] = useState<Album | null>(
    sdk.field.getValue() || null
  );

  useEffect(() => {
    sdk.window.startAutoResizer();
    console.log(sdk.field.getValue());
  }, [sdk.window]);

  const handleSearch = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/fetchAlbum?q=${encodeURIComponent(
          searchTerm
        )}`
      );
      const data = await res.json();

      const validAlbums = data.items
        .filter(Boolean)
        .filter((p: any) => p.id && p.name && p.uri);

      setResults(validAlbums);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const handleSelect = (album: Album) => {
    sdk.field.setValue(album.id);
    setSelected(album);
    setSearchTerm("");
    setResults([]); // Clear results to hide the list
    console.log("Selected album:", album.id);
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "1rem" }}>
      <h3>Select a Spotify Album</h3>
      {selected && selected.id ? (
        <div style={{ marginTop: "1rem" }}>
          <h4>Selected Album:</h4>
          <p>{selected.name}</p>
          <iframe
            title="Spotify Album Player"
            src={`https://open.spotify.com/embed/album/${selected.id}`}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
          <button
            style={{ marginTop: "1rem" }}
            onClick={() => {
              sdk.field.removeValue();
              setSelected(null);
            }}
          >
            Clear Selection
          </button>
        </div>
      ) : (
        <>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search playlists..."
            style={{ padding: "4px", width: "80%", marginRight: "8px" }}
          />
          <button onClick={handleSearch}>Search</button>
          <ul>
            {results.map((album) => (
              <li key={album.id} style={{ marginTop: "10px" }}>
                <strong>{album.name}</strong> by{" "}
                {album.artists.map((artist) => artist.name).join(", ")}
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => handleSelect(album)}
                >
                  Select
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Field;
