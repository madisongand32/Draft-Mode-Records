import * as contentful from "contentful";

// Declare environment variables
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID || "";
const DELIVERY_TOKEN = process.env.CONTENTFUL_TOKEN || "";
const PREVIEW_TOKEN = process.env.CONTENTFUL_PREVIEW_TOKEN || "";
const ENVIRONMENT = process.env.CONTENTFUL_ENV || "";

// Validate required environment variables
if (!SPACE_ID || !DELIVERY_TOKEN || !PREVIEW_TOKEN || !ENVIRONMENT) {
  throw new Error("Missing required Contentful environment variables.");
}

// Create Contentful clients
const deliveryClient = contentful.createClient({
  space: SPACE_ID,
  accessToken: DELIVERY_TOKEN,
  environment: ENVIRONMENT,
});

const previewClient = contentful.createClient({
  space: SPACE_ID,
  accessToken: PREVIEW_TOKEN,
  environment: ENVIRONMENT,
  host: "preview.contentful.com",
});

// Export a function to select the appropriate client
export const getClient = (usePreview = false) =>
  usePreview ? previewClient : deliveryClient;
