import { AssetWrapper } from "../../../lib/contentful/queries";

export function isAssetWrapper(obj: unknown): obj is AssetWrapper {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  const assetWrapper = obj as AssetWrapper;

  return (
    "sys" in assetWrapper &&
    typeof assetWrapper.sys === "object" &&
    assetWrapper.sys !== null &&
    "contentTypeId" in assetWrapper &&
    assetWrapper.contentTypeId === "assetWrapper" &&
    "fields" in assetWrapper &&
    typeof assetWrapper.fields === "object" &&
    assetWrapper.fields !== null &&
    "media" in assetWrapper.fields &&
    typeof assetWrapper.fields.media === "object" &&
    assetWrapper.fields.media !== null &&
    "fields" in assetWrapper.fields.media &&
    typeof assetWrapper.fields.media.fields === "object" &&
    assetWrapper.fields.media.fields !== null &&
    "file" in assetWrapper.fields.media.fields &&
    typeof assetWrapper.fields.media.fields.file === "object" &&
    assetWrapper.fields.media.fields.file !== null &&
    "url" in assetWrapper.fields.media.fields.file &&
    typeof assetWrapper.fields.media.fields.file.url === "string"
  );
}
