import { fetchAllAlbums } from "../../lib/contentful/queries";
import Link from "next/link";
import Image from "next/image";

export default async function HomePage() {
  const albums = await fetchAllAlbums();
  const slugify = (name: string) =>
    name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

  return (
    <main className="min-h-screen px-10">
      <section>
        <h2 className="text-2xl mb-4">Our Latest Records</h2>
        <div className="home-album-collection flex flex-col gap-3">
          {albums.map((album: any) => (
            <div key={album.sys.id} className="w-1/3 flex flex-col items-start">
              <div className="w-fit broken-record-image">
                <img
                  className="w-full h-auto mb-2 drop-shadow-xl border border-slate-50"
                  src={
                    album.fields.albumCover?.fields?.media.fields?.file?.url ||
                    ""
                  }
                  alt={album.fields.albumName}
                />
              </div>
              <strong>{album.fields.albumName}</strong>
              <Link href={`/album/${slugify(album.fields.albumName)}`}>
                <button>Listen Now</button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
