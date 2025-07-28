import { fetchArtistPageBySlug } from "../../../../lib/contentful/queries";
import Image from "next/image";
import ArtistPageContent from "@/app/comps/artistPageContent";

export default async function ArtistPage({ params }) {
  const { slug } = params;
  const artistPage = await fetchArtistPageBySlug({ slug });

  if (!artistPage) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Artist not found.
      </main>
    );
  }

  const artist = artistPage.fields.artist;
  const artistName = artist.fields.artistName;
  const artistImage = artist.fields.artistImage;

  console.log("Artist Page:", artistPage);

  return (
    <main className="min-h-screen">
      <section className="artist-hero">
        <div className="relative w-full h-[75vh]">
          <Image
            src={`https:${artist.fields.artistImage?.fields?.media.fields?.file?.url}`}
            alt={artist.fields.artistName}
            className="object-cover z-0 rounded-2xl border-10 border-black"
            fill
            sizes="100vw"
          />
          <div
            style={{ backgroundColor: "#00000070" }}
            className="absolute inset-0 bg-opacity-40 z-10 rounded-2xl"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center text-white">
            <h1 className="text-6xl font-bold">{artist.fields.artistName}</h1>
          </div>
        </div>
      </section>
      <section className="inner-sections">
        <ArtistPageContent page={artistPage} />
      </section>
    </main>
  );
}
