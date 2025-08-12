import { getClient } from "./client";
import * as contentful from "contentful";
import { Entry, EntrySkeletonType, EntrySys, EntryFields } from "contentful";

export type EntryReference = {
  sys: {
    id: string;
    linkType: "Entry";
    type: "Link";
  };
};

export type BackgroundColor =
  | "vinylDark"
  | "vinylOrange"
  | "vinylNeutral"
  | "vinylRed";

interface FeaturedAlbumFields {
  contentTypeId: "featuredAlbum";
  fields: {
    albumToFeature: Album;
    songToShow: contentful.EntryFields.Integer;
    imageAlignment: boolean;
  };
}

export type FeaturedAlbumProps = Entry<FeaturedAlbumFields>;

interface ArtistFields {
  contentTypeId: "artist";
  fields: {
    artistName: string;
    artistImage: AssetWrapper;
    bio?: string;
  };
}
export type Artist = Entry<ArtistFields>;

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

interface AssetWrapperFields {
  contentTypeId: "assetWrapper";
  fields: {
    altText: string;
    publishedDate?: string;
    media?: ContentfulAsset;
  };
}

export type AssetWrapper = Entry<AssetWrapperFields>;

export interface SpotifyPlayer {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string }[];
  };
}

interface AlbumFields {
  contentTypeId: "album";
  fields: {
    albumName: string; // Localized field
    albumCover: AssetWrapper;
    artist: Artist;
    songsInAlbum: Song[];
    releaseDate: contentful.EntryFields.Integer;
    isAlbumOfTheMonth?: contentful.EntryFields.Boolean;
  };
}

export type Album = Entry<AlbumFields>;

interface SongField {
  contentTypeId: "song";
  fields: {
    songTitle: string;
    spotifyPlayer?: SpotifyPlayer;
    artists: Artist;
  };
}

export type Song = Entry<SongField>;

export const fetchArtist = async ({
  slug,
  preview = false,
}: {
  slug: string;
  preview?: boolean;
}): Promise<Entry<ArtistFields> | undefined> => {
  try {
    const response = await getClient(preview).getEntries<ArtistFields>({
      content_type: "artist",
    });
    const slugify = (name: string) =>
      name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "");
    return response.items.find(
      (item) =>
        !!item.fields.artistName &&
        slugify(String(item.fields.artistName)) === slug
    );
  } catch {
    return;
  }
};

interface ArtistPageFields {
  contentTypeId: "artistPage";
  fields: {
    slug: string;
    artist: Artist;
    sections: Array<unknown>;
  };
}
export type ArtistPage = Entry<ArtistPageFields>;

interface DuplexFields {
  contentTypeId: "duplexComponent";
  fields: {
    featuredArtist?: Artist | EntryReference;
    artistFeatureImage?: AssetWrapper | EntryReference;
    imageAlignment?: EntryFields.Boolean;
    backgroundColor?: BackgroundColor;
  };
}

export type DuplexProps = Entry<DuplexFields>;

interface NewSongsFields {
  contentTypeId: "newSongsComponent";
  fields: {
    imageAlignment?: EntryFields.Boolean;
    songsToFeature: Album | EntryReference;
    songsToShow: contentful.EntryFields.Integer;
    backgroundColor?: BackgroundColor;
  };
}

export type NewSongsProps = Entry<NewSongsFields>;

export const fetchAllArtistPages = async (preview = false) => {
  try {
    const response = await getClient(preview).getEntries({
      content_type: "artistPage",
    });
    return response.items;
  } catch {
    return [];
  }
};

export const fetchArtistPageBySlug = async ({
  slug,
  preview = false,
}: {
  slug: string;
  preview?: boolean;
}) => {
  try {
    const response = await getClient(preview).getEntries({
      content_type: "artistPage",
      "fields.slug": slug,
      include: 3,
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
}): Promise<Entry<AlbumFields> | undefined> => {
  try {
    const response = await getClient(preview).getEntries<AlbumFields>({
      content_type: "album",
      include: 3,
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

// export const fetchPageWithSlug = async ({
//   slug,
//   preview = false,
// }: {
//   slug: string;
//   preview?: boolean;
// }) => {
//   try {
//     const response = await getClient(preview).getEntries({
//       content_type: "artistPage", // edit with artist page content type
//       "fields.slug": slug,
//     });
//     return response.items?.[0];
//   } catch {
//     return null;
//   }
// };

export const fetchArtistPageByArtistId = async ({
  artistId,
  preview = false,
}: {
  artistId: string;
  preview?: boolean;
}) => {
  try {
    const response = await getClient(preview).getEntries({
      content_type: "artistPage",
      "fields.artist.sys.id": artistId,
      include: 3,
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
