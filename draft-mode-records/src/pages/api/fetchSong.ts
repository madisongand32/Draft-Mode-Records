import Cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";

type NextHandler = (err?: Error) => void;

let cachedToken: string | null = null;
let tokenExpiresAt = 0;

const cors = Cors({
  methods: ["GET", "HEAD"],
  origin: ["http://localhost:3001", "https://app.contentful.com"], // adjust these origins as needed
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result?: Error) => {
      if (result instanceof Error) {
        return reject(result);
      }
      resolve();
    });
  });
}

async function getSpotifyToken() {
  const now = Date.now();
  if (cachedToken && now < tokenExpiresAt) {
    return cachedToken;
  }

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiresAt = now + data.expires_in * 1000 - 60000; // refresh 1 min early
  return cachedToken;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

  res.setHeader("Access-Control-Allow-Origin", "*"); // temporarily allow all origins for testing
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS");

  const { q } = req.query;

  if (!q || typeof q !== "string") {
    res.status(400).json({ error: "Missing or invalid query param q" });
    return;
  }

  const token = await getSpotifyToken();

  const searchRes = await fetch(
    `https://api.spotify.com/v1/search?type=track&limit=10&q=${encodeURIComponent(
      q
    )}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!searchRes.ok) {
    const error = await searchRes.json();
    res.status(searchRes.status).json({ error });
    return;
  }

  const data = await searchRes.json();
  res.status(200).json(data.tracks); // Return tracks
}
