"use client";

import { FieldAppSDK } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";
import { useEffect, useState } from "react";

type Song = {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string }[];
  };
};

const Field = () => {
  const sdk = useSDK<FieldAppSDK>();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [selected, setSelected] = useState<Song | null>(
    sdk.field.getValue() || null
  );

  useEffect(() => {
    sdk.window.startAutoResizer();
    console.log(sdk.field.getValue());
  }, [sdk.window]);

  // update url
  const handleSearch = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/fetchSong?q=${encodeURIComponent(
          searchTerm
        )}`
      );
      const data = await res.json();

      const validSongs = data.items
        .filter(Boolean)
        .filter((p: any) => p.id && p.name && p.uri);

      setResults(validSongs);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const handleSelect = (song: Song) => {
    sdk.field.setValue(song.id);
    setSelected(song);
    setSearchTerm("");
    setResults([]); // Clear results to hide the list
    console.log("results", results);
  };

  if (!selected) {
    return (
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search songs..."
          style={{
            border: "1px solid rgb(207, 217, 224)",
            color: "rgb(65, 77, 99)",
            borderRadius: "6px",
            fontSize: "0.875rem",
            padding: "10px 0.75rem",
            height: "40px",
            width: "75%",
          }}
        />
        <button
          style={{
            marginTop: "10px",
            padding: "0.25rem 0.75rem",
            border: "1px solid rgb(207, 217, 224)",
            backgroundColor: "rgb(255, 255, 255)",
            color: "rgb(17, 27, 43)",
            fontSize: "0.875rem",
            fontWeight: "600",
            borderRadius: "6px",
            height: "40px",
            marginLeft: "10px",
            cursor: "pointer",
          }}
          onClick={handleSearch}
        >
          Search
        </button>
        <ul>
          {results.map((song) => (
            <li key={song.id} style={{ marginTop: "10px" }}>
              <strong>{song.name}</strong> by{" "}
              {song.artists.map((artist) => artist.name).join(", ")}
              <em>({song.album.name})</em>
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => handleSelect(song)}
              >
                Select
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (selected && !selected.id) {
    return (
      <div>
        <iframe
          title="Spotify Song Player"
          src={`https://open.spotify.com/embed/track/${selected}`}
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
        <button
          style={{
            marginTop: "10px",
            padding: "0.25rem 0.75rem",
            border: "1px solid rgb(207, 217, 224)",
            backgroundColor: "rgb(255, 255, 255)",
            color: "rgb(17, 27, 43)",
            fontSize: "0.875rem",
            fontWeight: "600",
            borderRadius: "6px",
          }}
          onClick={() => {
            sdk.field.removeValue();
            setSelected(null);
          }}
        >
          Clear Selection
        </button>
      </div>
    );
  }

  return (
    <div>
      <iframe
        title="Spotify Song Player"
        src={`https://open.spotify.com/embed/track/${selected.id}`}
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
      <button
        style={{
          marginTop: "10px",
          padding: "0.25rem 0.75rem",
          border: "1px solid rgb(207, 217, 224)",
          backgroundColor: "rgb(255, 255, 255)",
          color: "rgb(17, 27, 43)",
          fontSize: "0.875rem",
          fontWeight: "600",
          borderRadius: "6px",
        }}
        onClick={() => {
          sdk.field.removeValue();
          setSelected(null);
        }}
      >
        Clear Selection
      </button>
    </div>
  );
};

export default Field;
