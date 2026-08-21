import type { Author } from "./types";

export const authors: Author[] = [
  { id: "au-1", name: "Elena Marchetti", role: "Prompt Engineer", avatarInitials: "EM" },
  { id: "au-2", name: "Julian Cross", role: "Content Strategist", avatarInitials: "JC" },
  { id: "au-3", name: "Priya Nair", role: "Senior Developer", avatarInitials: "PN" },
  { id: "au-4", name: "Marcus Chen", role: "Growth Marketer", avatarInitials: "MC" },
  { id: "au-5", name: "Sofia Reyes", role: "Creative Director", avatarInitials: "SR" },
  { id: "au-6", name: "Owen Whitfield", role: "SEO Lead", avatarInitials: "OW" },
  { id: "au-7", name: "Amara Okafor", role: "Business Analyst", avatarInitials: "AO" },
  { id: "au-8", name: "Liam Foster", role: "Research Fellow", avatarInitials: "LF" },
];

export function getAuthor(id: string) {
  return authors.find((a) => a.id === id)!;
}
