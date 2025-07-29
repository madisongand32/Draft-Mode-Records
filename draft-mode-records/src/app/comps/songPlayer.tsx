import { getSongData } from "../../../lib/contentful/spotify";
import { SpotifyPlayer } from "../../../lib/contentful/queries";
import Image from "next/image";

export default async function SongPlayer({ songId }: { songId: string }) {
  const song: SpotifyPlayer = await getSongData(songId);

  if (!song) {
    return <div>Song not found.</div>;
  }

  return (
    <div>
      <h1>{song.name}</h1>
      {song.album?.images?.[0]?.url && (
        <Image src={song.album.images[0].url} alt={`${song.name} cover`} />
      )}
      <p>{song.album.name || "No description available."}</p>

      <iframe
        title={`Spotify Song: ${song.name}`}
        src={`https://open.spotify.com/embed/track/${song.id}`}
        width="100%"
        height="380"
        frameBorder="0"
        allow="encrypted-media"
        allowFullScreen
      />
    </div>
  );
}
