export function getBlogTagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const BLOG_TAG_ALIASES: Record<string, string> = {
  ecmascript: "javascript",
  es2015: "javascript",
  "chrome-extension": "chrome-extensions",
  "google-chrome": "chrome-extensions",
  sikh: "sikhi",
  vegetarian: "vegan",
  "plant-based-diet": "vegan",
  dieting: "weight-loss",
  dom: "web-platform",
  html: "web-platform",
  "web-apis": "web-platform",
  "web-apps": "web-platform",
  samsung: "samsung-internet",
  seoul: "south-korea",
  suwon: "south-korea",
};

export function getBlogTagColors(tag: string): {
  backgroundColor: string;
  textColor: string;
  darkBackgroundColor: string;
  darkTextColor: string;
} {
  const hash = Array.from(tag.toLowerCase()).reduce(
    (value, character) => (value * 31 + character.charCodeAt(0)) >>> 0,
    0
  );
  const hue = hash % 360;

  return {
    backgroundColor: `hsl(${hue} 30% 88%)`,
    textColor: `hsl(${hue} 25% 30%)`,
    darkBackgroundColor: `hsl(${hue} 24% 24%)`,
    darkTextColor: `hsl(${hue} 32% 78%)`,
  };
}
