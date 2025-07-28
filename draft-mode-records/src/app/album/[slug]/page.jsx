import { fetchAlbum } from "../../../../lib/contentful/queries";
import Image from "next/image";

export default async function AlbumPage({ params }) {
  const album = await fetchAlbum({ slug: params.slug });
  const albumName = album?.fields.albumName;

  console.log(album);

  // Get the artist reference from the album
  const artist = album?.fields.artist.fields;
  const artistName = artist.artistName;
  const artistImage = artist.artistImage;

  return (
    <main className="min-h-screen">
      <section className="-mx-10">
        <div className="w-full h-full relative">
          <Image
            src={`https:${artistImage.fields?.media.fields.file.url}`}
            alt={albumName || ""}
            fill
            sizes="100vw"
            className="!h-[75vh] !w-full object-cover !relative"
          />
        </div>
      </section>
      <section
        className="bg-vinylDark text-white px-10 -mx-10 py-20 flex flex-col items-center gap-4"
        id="songsInPlayer"
      >
        <h1 className="text-4xl">{album.fields.albumName}</h1>
        <h2 className="text-lg">
          {artistName} / {new Date(album.fields.releaseDate).getFullYear()}
        </h2>
        {album.metadata.tags && album.metadata.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
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
        {album.fields.songsInAlbum?.map((songEntry, index) => {
          const songFields = songEntry?.fields;
          const songId = songFields?.spotifyPlayer;
          console.log("Song Entry:", songEntry);
          console.log("Song ID:", songId);
          if (!songId) return null; // skip if no ID

          return (
            <div key={songId || index} className="list-of-songs w-full mx-20">
              <iframe
                title={`Spotify Song Player - ${songFields?.songTitle}`}
                src={`https://open.spotify.com/embed/track/${songId}`}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          );
        })}
      </section>
    </main>
  );
}
