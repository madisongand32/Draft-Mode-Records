import {
  fetchAlbum,
  fetchArtist,
  Artist,
} from "../../../../lib/contentful/queries";
import { Entry } from "contentful";
import Image from "next/image";

export default async function AlbumPage(props: { params: { slug: string } }) {
  const params = await props.params;
  const album = await fetchAlbum({ slug: params.slug });
  const albumName = album?.fields.albumName;

  // Get the artist reference from the album
  const artistRef = album?.fields.artist as Entry<Artist> | undefined;
  const artistName = artistRef?.fields?.artistName;

  // Fetch the full artist entry using fetchArtist (by name)
  const artistEntry = artistRef as Entry<Artist>;
  const artist =
    artistEntry && typeof artistName === "string"
      ? await fetchArtist({ slug: artistName })
      : null;
  const artistImage = artist?.fields?.artistImage;

  if (!album || !artist) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Album not found.
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <section className="-mx-10">
        <div className="w-full h-full relative">
          <Image
            src={`https:${artistImage.fields?.media.fields.file.url}`}
            alt={albumName as string}
            fill
            className="!h-[75vh] !w-full object-cover !relative"
          />{" "}
        </div>
      </section>
      <section className="bg-vinylDark text-white px-10 -mx-10 py-20 flex flex-col items-center gap-4">
        <h1 className="text-4xl">{album.fields.albumName as string}</h1>
        {album.metadata.tags && album.metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {album.metadata.tags.map((tag) => (
              <span
                key={tag.sys.id}
                className="bg-gray-700 text-white px-2 py-1 rounded-md"
              >
                {tag.sys.id}
              </span>
            ))}
          </div>
        )}
      </section>
      <section className="album-player">
        <div className="flex gap-10 flex-col md:flex-row items-center justify-between py-6">
          <div className="w-full md:w-1/2">
            <h3>{album.fields.albumName as string}</h3>
            <h4 className="text-sm">
              {artistName} /{" "}
              {new Date(album.fields.releaseDate as number).getFullYear()}
            </h4>
          </div>
          <div className="w-full md:w-1/2 list-of-songs">
            <iframe
              title="Spotify Album Player"
              src={`https://open.spotify.com/embed/album/${album.fields.spotifyPlayer}`}
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
