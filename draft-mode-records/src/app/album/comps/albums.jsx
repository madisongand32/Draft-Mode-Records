import Link from "next/link";
import Image from "next/image";
import { fetchAllAlbums } from "../../../../lib/contentful/queries";

export default async function Albums({ limit }) {
  const albums = await fetchAllAlbums();
  const slugify = (name) =>
    name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

  const displayedAlbums = limit ? albums.slice(0, limit) : albums;

  return (
    <>
      {displayedAlbums.map((album) => (
        <div
          key={album.sys.id}
          className="w-1/3 flex flex-col items-start justify-end mr-3"
        >
          <div className="relative w-full aspect-square -mb-5">
            {/* Record (background, offset right) */}
            <Image
              src="/assets/broken-record.png"
              alt="Broken record background"
              fill
              className="z-0 object-cover"
              style={{ right: "-15%", left: "auto" }} // offset to the right
              priority
            />

            <div className="absolute inset-0 w-[90%] h-[90%] flex items-start justify-start z-10">
              <Link href={`/album/${slugify(album.fields.albumName)}`}>
                <Image
                  src={`https:${album.fields.albumCover?.fields?.media.fields?.file?.url}`}
                  alt={album.fields.albumName}
                  fill
                  className="object-contain rounded shadow"
                  priority
                />
              </Link>
            </div>
          </div>
          <strong>{album.fields.albumName}</strong>
          <Link href={`/album/${slugify(album.fields.albumName)}`}>
            Listen Now
          </Link>
        </div>
      ))}
    </>
  );
}
