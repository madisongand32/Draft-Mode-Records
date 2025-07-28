import Link from "next/link";
import Image from "next/image";
import { fetchAllArtistPages } from "../../../lib/contentful/queries";

export default async function ArtistPage({ limit }) {
  const artistPages = await fetchAllArtistPages();
  const slugify = (name) =>
    name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

  console.log("Artist Pages:", artistPages);

  const displayedAlbums = limit ? artistPages.slice(0, limit) : artistPages;

  return (
    <>
      {displayedAlbums.map((artistPage) => (
        <div
          key={artistPage.sys.id}
          className="w-1/3 flex flex-col items-start justify-end mr-3"
        >
          <h1>{artistPage.fields.slug}</h1>
        </div>
      ))}
    </>
  );
}
