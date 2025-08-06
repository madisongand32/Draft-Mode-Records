import { fetchArtistPageBySlug } from "../../../../lib/contentful/queries";
import ArtistPageContent from "../comps/artistPageContent";
import { draftMode } from "next/headers";

export default async function ArtistPage({ params }) {
  const { slug } = params;
  const { isEnabled } = await draftMode();

  const artistPage = await fetchArtistPageBySlug({
    slug,
    preview: isEnabled,
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
