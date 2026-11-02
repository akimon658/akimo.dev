import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Self-authored articles. `date` is optional: entries without one fall back
// to their Git creation date (see `resolveBlogDate` in `src/libs/posts.ts`),
// mirroring the former Lume `date: Git Created` default.
// Unknown legacy frontmatter keys (oldUrl, url, id, lang, draft, tags, ...)
// are stripped by the schema; only `oldUrl` lives on in `public/_redirects`.
const blog = defineCollection({
  loader: glob({
    base: "./src/content/blog",
    pattern: "**/*.mdx",
    // Keep the `.en` suffix in ids: the default generator would sluggify
    // `awesome-header.en.mdx` to `awesome-headeren`, making languages
    // indistinguishable. Only the file extension is stripped.
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ""),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.coerce.date().optional(),
      image: image().optional(),
    }),
});

// Metadata-only entries for articles hosted elsewhere (Zenn, traP, ...).
// These are *data* entries (YAML): they never render to pages, so unlike the
// Lume era there is no `/external/` route to hide from robots/sitemap.
const external = defineCollection({
  loader: glob({ base: "./src/data/external", pattern: "**/*.yaml" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      externalUrl: z.string().url(),
      image: image().optional(),
    }),
});

export const collections = { blog, external };
