import { getClient } from "./client";
import * as contentful from "contentful";

const CONTENT_TYPE_NAME = "pageContent";
const INCLUDES_COUNT = 5;

export type HeroSize = "small" | "medium" | "large" | "fullScreen";

export type HeroBanner = {
  contentTypeId: "heroBanner";
  fields: {
    internalName: contentful.EntryFields.Symbol;
    headline: contentful.EntryFields.Symbol;
    bodyText: contentful.EntryFields.Symbol;
    backgroundImage: contentful.EntryFields.AssetLink;
    heroSize: HeroSize;
  };
};

export type PageEntry = {
  contentTypeId: "pageContent";
  fields: {
    // internalName: contentful.EntryFieldTypes.Text;
    internalName: contentful.EntryFields.Symbol;
    pageTitle: contentful.EntryFields.Symbol;
    slug: contentful.EntryFields.Symbol;
    // seoMetadata?: contentful.EntryFields.Array<
    //   contentful.EntryFields.EntryLink<
    //     HeroBannerSkeleton | DuplexSectionSkeleton
    //   >
    // >;
    sections?: contentful.EntryFields.Array<
      contentful.EntryFields.EntryLink<HeroBanner>
    >;
  };
};

export interface PageFields {
  title: string;
  slug: string;
  // pageType: string;
  // seo?: any;
  sections: PageEntry["fields"]["sections"] | undefined;
  hero?: HeroBanner | undefined;
}

export interface IPageEntry extends PageFields {
  sys?: any;
}

//New content for record label

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
      include: INCLUDES_COUNT,
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
}) => {
  try {
    const response = await getClient(preview).getEntries({
      content_type: "album",
      include: INCLUDES_COUNT,
    });
    // Slugify function must match how you generate slugs in your app
    const slugify = (name: string) =>
      name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "");
    return response.items.find(
      (item: any) => slugify(item.fields.albumName) === slug
    );
  } catch {
    return null;
  }
};

export const fetchAllAlbums = async (preview = false) => {
  try {
    const response = await getClient(preview).getEntries({
      content_type: "album",
      include: INCLUDES_COUNT,
    });
    return response.items;
  } catch {
    return [];
  }
};

export const fetchPages = async () => {
  return getClient().getEntries<PageEntry>({
    content_type: "pageContent",
    include: INCLUDES_COUNT,
  });
};

export const fetchPageWithSlug = async ({
  slug,
  preview = false,
}: {
  slug: string;
  preview?: boolean;
}) => {
  try {
    const response = await getClient(preview).getEntries({
      content_type: CONTENT_TYPE_NAME,
      "fields.slug": slug,
      include: INCLUDES_COUNT,
    });
    return response.items?.[0];
  } catch {
    return null;
  }
};
