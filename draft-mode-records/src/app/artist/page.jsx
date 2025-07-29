import { fetchAllArtistPages } from "../../../lib/contentful/queries";

export default async function ArtistPage() {
  const artistPages = await fetchAllArtistPages();

  console.log("Artist Pages:", artistPages);

  return (
    <>
      {artistPages.map((artistPage) => (
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
