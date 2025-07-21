export default function getLocalizedString(
  field: unknown,
  fallbackLocale = "en-US"
): string {
  if (typeof field === "string") return field;
  if (
    field &&
    typeof field === "object" &&
    fallbackLocale in field &&
    typeof (field as Record<string, unknown>)[fallbackLocale] === "string"
  ) {
    return (field as Record<string, string>)[fallbackLocale];
  }
  if (field && typeof field === "object") {
    const str = Object.values(field).find((val) => typeof val === "string");
    if (typeof str === "string") return str;
  }
  return "";
}
