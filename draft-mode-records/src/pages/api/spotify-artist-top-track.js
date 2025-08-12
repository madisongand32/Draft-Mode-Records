// Rename this file to spotify-artist-top-track.js for clarity and update your client fetch URL accordingly
export default async function handler(req, res) {
  const { artistName, market = "US" } = req.query;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  // Get artist ID
  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(clientId + ":" + clientSecret).toString("base64"),
    },
    body: "grant_type=client_credentials",
  });
  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  // Search for artist
  const searchResponse = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      artistName
    )}&type=artist&limit=1`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  const searchData = await searchResponse.json();
  const artistId = searchData.artists.items[0]?.id;

  // Get top tracks
  const topTracksResponse = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=${market}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  const topTracksData = await topTracksResponse.json();
  const topTrackId = topTracksData.tracks[0]?.id;
  res.status(200).json({ topTrackId });
}
