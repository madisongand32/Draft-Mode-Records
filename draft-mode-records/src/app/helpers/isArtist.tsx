import { Artist } from "../../../lib/contentful/queries";

export function isArtist(obj: unknown): obj is Artist {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  const artist = obj as Artist;

  return (
    "sys" in artist &&
    typeof artist.sys === "object" &&
    artist.sys !== null &&
    "contentTypeId" in artist.sys && // Check contentTypeId in sys
    typeof artist.sys.contentTypeId === "string" &&
    artist.sys.contentTypeId === "artist" &&
    "fields" in artist &&
    typeof artist.fields === "object" &&
    artist.fields !== null
  );
}
