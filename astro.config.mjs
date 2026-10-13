import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import contentUtils from "@inox-tools/content-utils";
import tailwindcss from "@tailwindcss/vite";
import rehypeExternalLinks from "rehype-external-links";
import remarkGfm from "remark-gfm";
import { defineConfig } from "astro/config";
import { rehypeTreeSitter } from "./src/libs/rehype-tree-sitter.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://akimo.dev",
  output: "static",
  i18n: {
    defaultLocale: "ja",
    locales: ["ja", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: "ja",
        locales: {
          ja: "ja",
          en: "en",
        },
      },
    }),
    contentUtils(),
  ],
  markdown: {
    // Highlighting is done by our tree-sitter rehype plugin (ported from
    // Lume) so the built-in Shiki highlighter must stay off: it would
    // otherwise rewrite `pre > code.language-*` before our plugin runs.
    syntaxHighlight: false,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeTreeSitter,
      [
        rehypeExternalLinks,
        {
          properties: {
            class:
              "after:content-open-in-new after:dark:content-open-in-new-dark",
          },
          rel: ["noopener", "noreferrer"],
          target: "_blank",
        },
      ],
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
