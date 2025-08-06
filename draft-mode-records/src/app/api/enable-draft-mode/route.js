import { draftMode, cookies } from "next/headers";
import { NextResponse } from "next/server";
import { fetchArtistPageBySlug } from "../../../../lib/contentful/queries";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  if (!secret || !slug) {
    console.log("no secret, no slug");
    return new Response("Missing parameters", { status: 400 });
  }

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    console.log("secret does not match");
    return new Response("Invalid token", { status: 401 });
  }

  const artist = await fetchArtistPageBySlug(slug, { preview: true });
  console.log(
    "enable-draft-post",
    artist && artist.fields ? artist.fields.slug : null,
    slug
  );

  if (!artist) {
    return new Response(`Post ${slug} not found`, { status: 404 });
  }

  draftMode().enable();

  const cookieStore = cookies();
  const cookie = cookieStore.get("__prerender_bypass");
  cookies().set({
    name: "__prerender_bypass",
    value: cookie?.value,
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "none",
  });

  // Redirect to the dynamic route, e.g., /artist/my-artist-slug
  return NextResponse.redirect(new URL(`/artist/${slug}`, request.url));
}
