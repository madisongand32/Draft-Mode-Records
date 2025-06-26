import { fetchAlbum } from "../../../../lib/contentful/queries";
import Image from "next/image";

export default async function AlbumPage({
  params,
}: {
  params: { slug: string };
}) {
  const album = await fetchAlbum({ slug: params.slug });

  if (!album) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Album not found.
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <h1 className="text-4xl">{album.fields.albumName as string}</h1>
      {/* Example: render album cover if available */}
      {album.fields.albumCover?.fields?.media?.fields?.file?.url && (
        <Image
          src={`https:${album.fields.albumCover?.fields?.media.fields?.file?.url}`}
          alt={album.fields.albumName as string}
          className="mb-6"
          height="100"
          width="100"
        />
      )}
    </main>
  );
}
