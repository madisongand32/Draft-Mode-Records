import { fetchArtistPageBySlug } from "../../../../lib/contentful/queries";
import ArtistPageContent from "../comps/artistPageContent";
import { draftMode } from "next/headers";

export default async function ArtistPage({ params }) {
  const { slug } = params;
  const artistPage = await fetchArtistPageBySlug({
    slug,
    preview: draftMode().isEnabled,
  });

  if (!artistPage) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Artist not found.
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <ArtistPageContent page={artistPage} />
    </main>
  );
}
