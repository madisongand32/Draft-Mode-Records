import { getClient } from "./client";
import * as contentful from "contentful";
import { Entry, EntrySkeletonType, EntrySys } from "contentful";

// to update when content type exists
export interface HeroBanner extends EntrySkeletonType {
  sys: EntrySys;
  fields: {
    headline: string;
    subline: string;
    size: string;
    style: string;
    image: AssetWrapper;
  };
}

export interface ContentfulAsset {
  metadata: {
    tags: string[];
  };
  sys: {
    space: {
      sys: {
        type: "Link";
        linkType: "Space";
        id: string;
      };
    };
    type: "Asset";
    id: string;
    revision: number;
    createdAt: string;
    updatedAt: string;
    environment: {
      sys: {
        id: string;
        type: "Link";
        linkType: "Environment";
      };
    };
    locale: string;
  };
  fields: {
    title: string;
    file: {
      url: string;
      details: {
        size: number;
        image: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

export interface AssetWrapperFields {
  altText: string;
  publishedDate?: string;
  media?: ContentfulAsset;
}

export interface AssetWrapper extends EntrySkeletonType {
  sys: EntrySys;
  fields: AssetWrapperFields;
}

export interface Artist extends EntrySkeletonType {
  sys: EntrySys;
  contentTypeId: "artist";
  fields: {
    artistName: string;
    artistImage: AssetWrapper;
    bio: string; // Localized field
  };
}

export interface SpotifyPlayer {
  id: string;
  name: string;
  images: { url: string }[];
  artists: { name: string }[];
}

export interface Album extends EntrySkeletonType {
  sys: EntrySys;
  fields: {
    albumName: string; // Localized field
    albumCover: AssetWrapper;
    artist: Artist;
    releaseDate: contentful.EntryFields.Integer;
    spotifyPlayer?: SpotifyPlayer;
    isAlbumOfTheMonth?: contentful.EntryFields.Boolean;
  };
}

export interface Song extends EntrySkeletonType {
  sys: EntrySys;
  fields: {
    title: string;
    spotifyLink: string;
    artists: Artist[];
  };
}

export const fetchArtist = async ({
  slug,
  preview = false,
}: {
  slug: string;
  preview?: boolean;
}) => {
  try {
    const response = await getClient(preview).getEntries({
      content_type: "artist",
      "fields.artistName": slug,
    });
    return response.items?.[0];
  } catch {
    return null;
  }
};

export const fetchAlbum = async ({
  slug,
  preview = false,
}: {
  slug: string;
  preview?: boolean;
}): Promise<Entry<Album> | undefined> => {
  try {
    const response = await getClient(preview).getEntries<Album>({
      content_type: "album",
    });
    const slugify = (name: string) =>
      name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "");
    return response.items.find(
      (item) =>
        !!item.fields.albumName &&
        slugify(String(item.fields.albumName)) === slug
    );
  } catch {
    return;
  }
};

export const fetchAllAlbums = async (preview = false) => {
  try {
    const response = await getClient(preview).getEntries({
      content_type: "album",
    });
    return response.items;
  } catch {
    return [];
  }
};

// export const fetchPages = async () => {
//   return getClient().getEntries<PageEntry>({
//     content_type: "pageContent",
//     include: INCLUDES_COUNT,
//   });
// };

export const fetchPageWithSlug = async ({
  slug,
  preview = false,
}: {
  slug: string;
  preview?: boolean;
}) => {
  try {
    const response = await getClient(preview).getEntries({
      content_type: "artistPage", // edit with artist page content type
      "fields.slug": slug,
    });
    return response.items?.[0];
  } catch {
    return null;
  }
};

// Importing Chigo's
export interface IPexelsImageWrapper extends EntrySkeletonType {
  sys: EntrySys;
  fields: {
    internalTitle: string;
    pexelsImage: {
      photographer: string;
      photographer_url: string;
      image: string;
      src: {
        original: string;
        large2x?: string;
        large: string;
        medium: string;
        small: string;
        portrait: string;
        landscape: string;
        tiny: string;
      };
      alt: string;
      avg_color: string;
      url: string;
      attribution: string;
      photographer_attribution: string;
      width: number;
      height?: number;
    };
  };
}
