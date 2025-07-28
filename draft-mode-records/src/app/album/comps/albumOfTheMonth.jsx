import Image from "next/image";
import { fetchAllAlbums } from "../../../../lib/contentful/queries";
import { Play } from "lucide-react";
import Link from "next/link";

export default async function AlbumOfTheMonth() {
  const albums = await fetchAllAlbums();
  const album = albums.find((a) => a.fields.isAlbumOfTheMonth === true);

  const slugify = (name) =>
    name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

  if (!album) {
    return (
      <section className="album-of-the-month">
        <h2 className="text-xl mb-6">Album of the Month</h2>
        <p>No album of the month found.</p>
      </section>
    );
  }

  return (
    <div className="album-of-the-month pb-10">
      <h2 className="text-xl mb-10">Album of the Month</h2>
      <div className="flex flex-col-reverse md:!flex-row items-center gap-10 bg-vinylDark text-white px-5 py-8 rounded-xl shadow md:min-h-[80vh]">
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <div>
            <h3 className="font-semibold text-2xl md:text-3xl">
              {album.fields?.artist?.fields?.artistName} /{" "}
              {album.fields?.releaseDate}
            </h3>
          </div>
          <div className="h-[1px] w-full bg-vinylOrange" />
          <h4 className="text-xl md:text-2xl">{album.fields?.albumName}</h4>
          <div className="h-[1px] w-full bg-vinylOrange" />
          <p className="text-sm font-thin">
            {album.fields?.artist?.fields?.bio}
          </p>
          <div>
            <a
              href={`/album/${album.fields.albumName
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9\-]/g, "")}#songsInPlayer`}
              className="flex text-xs flex-row items-center justify-start gap-2"
            >
              <p>Listen to the preview</p>{" "}
              <Play color="#ef874a" fill="#ef874a" size={20} />
            </a>
          </div>
          <div className="flex flex-row md:flex-col gap-3 mt-5">
            <div className="w-full">
              <Link
                className="bg-vinylOrange text-sm lg:text-base font-semibold text-vinylDark px-6 py-4 rounded-full w-full block text-center"
                href={`/album/${slugify(album.fields.albumName)}`}
              >
                View the Album
              </Link>
            </div>
            <div className="w-full">
              {/* <Link
                className="bg-vinylNeutral text-sm lg:text-base font-semibold px-6 py-4 rounded-full w-full block text-center"
                href={`/artist/${slugify(
                  album.fields.artist.fields?.artistName
                )}`}
              >
                View the Artist
              </Link> */}
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/3 h-full relative flex items-center justify-center">
          <Image
            src="/assets/broken-record.png"
            alt="Broken record background"
            width={520}
            height={520}
            className="absolute right-[-60px] top-1/2 -translate-y-1/2 z-0 lg:w-[520px] lg:h-[520px]"
            priority
          />
          <Image
            src={`https:${album.fields.albumCover?.fields?.media.fields?.file?.url}`}
            alt={album.fields.albumName}
            width={420}
            height={420}
            className="relative z-10 shadow lg:w-[420px] lg:h-[420px]"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
}
