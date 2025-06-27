import Albums from "./album/comps/albums";
import AlbumOfTheMonth from "./album/comps/albumOfTheMonth";

export default async function HomePage() {
  return (
    <main>
      <section>
        <AlbumOfTheMonth />
      </section>
      <section>
        <h2 className="text-2xl mb-10">Our Latest Records</h2>
        <div className="home-album-collection flex flex-row gap-3">
          <Albums limit={9} />
        </div>
      </section>
    </main>
  );
}
