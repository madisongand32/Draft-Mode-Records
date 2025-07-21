import { getPlaylistData } from "../../../lib/contentful/spotify";

export default async function SpotifyPlayer() {
  const playlistId = "37i9dQZF1DX2sUQwD7tbmL"; // hardcoded or dynamic
  const playlist = await getPlaylistData(playlistId);

  if (!playlist) {
    return <div>Playlist not found.</div>;
  }

  return (
    <div>
      <h1>{playlist.name}</h1>
      {playlist.images && playlist.images[0] && (
        <img src={playlist.images[0].url} alt={`${playlist.name} cover`} />
      )}
      <p>{playlist.description || "No description available."}</p>

      <iframe
        title={`Spotify Playlist: ${playlist.name}`}
        src={`https://open.spotify.com/embed/playlist/${playlist.id}`}
        width="100%"
        height="380"
        frameBorder="0"
        allow="encrypted-media"
        allowFullScreen
      />
    </div>
  );
}
