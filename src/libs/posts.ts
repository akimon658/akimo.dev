// Unified article-list model: self-authored `blog` posts of one language,
// plus the `external` metadata entries. External entries carry no `lang`
// field, so like the former Lume build (where lang-less pages belong to the
// default language) they appear in Japanese lists only. Sorted newest-first,
// mirroring the former `List` component query
// (`category=blog`, `sort=date=desc`).

import { getCollection, type CollectionEntry } from "astro:content";
import { getOldestCommitDate } from "@it-astro:content/git";
import { siteText, type Lang } from "./site";

export type BlogEntry = CollectionEntry<"blog">;
export type ExternalEntry = CollectionEntry<"external">;

export interface PostItem {
  title: string;
  href: string;
  image?: string;
  date: Date;
  lang: Lang;
  isExternal: boolean;
  host?: string;
}

export interface Alternate {
  lang: Lang;
  url: string;
  label: string;
}

/** Collection id `awesome-header.en` -> lang `en`; anything else -> `ja`. */
export const langOf = (id: string): Lang =>
  id.endsWith(".en") ? "en" : "ja";

/** Collection id -> URL slug (`awesome-header.en` -> `awesome-header`). */
export const slugOf = (id: string): string => id.replace(/\.en$/, "");

export const postUrl = (lang: Lang, slug: string): string =>
  lang === "ja" ? `/blog/${slug}/` : `/en/blog/${slug}/`;

/**
 * Lume's `date: Git Created` default: explicit frontmatter date wins,
 * otherwise the file's Git creation date. Provided by inox-tools'
 * content-utils (B案); uncommitted files resolve to the current time.
 */
export async function resolveBlogDate(entry: BlogEntry): Promise<Date> {
  if (entry.data.date instanceof Date) {
    return entry.data.date;
  }
  return getOldestCommitDate(entry);
}

export async function getSortedPosts(lang: Lang): Promise<PostItem[]> {
  const [blog, external] = await Promise.all([
    getCollection("blog"),
    getCollection("external"),
  ]);

  const dated = await Promise.all([
    ...blog
      .filter((entry) => langOf(entry.id) === lang)
      .map(async (entry) => ({
        title: entry.data.title,
        href: postUrl(lang, slugOf(entry.id)),
        image: entry.data.image,
        date: await resolveBlogDate(entry),
        lang,
        isExternal: false as const,
      })),
    ...external
      .filter(() => lang === "ja")
      .map((entry) => ({
        title: entry.data.title,
        href: entry.data.externalUrl,
        image: entry.data.image,
        date: entry.data.date,
        lang: "ja" as Lang,
        isExternal: true as const,
        host: new URL(entry.data.externalUrl).hostname,
      })),
  ]);

  return dated.sort((a, b) => b.date.getTime() - a.date.getTime());
}

/**
 * Counterpart of a blog post in the other language, matched by slug
 * (the former Lume `id` frontmatter always equaled the slug).
 * The label comes from the *other* locale's dictionary, so e.g. the
 * Japanese page offers "Switch to English".
 */
export async function getPostAlternates(
  slug: string,
  lang: Lang,
): Promise<Alternate[]> {
  const other: Lang = lang === "ja" ? "en" : "ja";
  const blog = await getCollection("blog");
  const found = blog.some(
    (entry) => slugOf(entry.id) === slug && langOf(entry.id) === other,
  );
  if (!found) {
    return [];
  }
  return [{ lang: other, url: postUrl(other, slug), label: siteText[other].switch_to }];
}

const indexPaths = {
  home: { ja: "/", en: "/en/" },
  blog: { ja: "/blog/", en: "/en/blog/" },
} as const;

export function getIndexAlternates(
  kind: keyof typeof indexPaths,
  lang: Lang,
): Alternate[] {
  const other: Lang = lang === "ja" ? "en" : "ja";
  return [
    {
      lang: other,
      url: indexPaths[kind][other],
      label: siteText[other].switch_to,
    },
  ];
}
