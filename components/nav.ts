/** Primary navigation. Roman numerals are an editorial device, not decoration. */
export const navItems = [
  { numeral: "I", label: "Research", href: "/research" },
  { numeral: "II", label: "Engineering", href: "/engineering" },
  { numeral: "III", label: "Writing", href: "/blog" },
  { numeral: "IV", label: "Interests", href: "/interests" },
] as const;

/** Section name shown in the running header, keyed by first path segment. */
export function sectionNameFor(pathname: string): string {
  const seg = pathname.split("/")[1] ?? "";
  if (!seg) return "Cover";
  const match = navItems.find((item) => item.href === `/${seg}`);
  if (match) return match.label;
  if (seg === "archive") return "Archive";
  return seg.replace(/-/g, " ");
}
