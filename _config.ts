import Lua from "@tree-sitter-grammars/tree-sitter-lua"
import Markdown from "@tree-sitter-grammars/tree-sitter-markdown"
import YAML from "@tree-sitter-grammars/tree-sitter-yaml"
import escapeHtml from "escape-html"
import lume from "lume/mod.ts"
import googleFonts from "lume/plugins/google_fonts.ts"
import jsx from "lume/plugins/jsx.ts"
import mdx from "lume/plugins/mdx.ts"
import metas from "lume/plugins/metas.ts"
import minifyHTML from "lume/plugins/minify_html.ts"
import multilanguage from "lume/plugins/multilanguage.ts"
import redirects from "lume/plugins/redirects.ts"
import robots from "lume/plugins/robots.ts"
import sitemap from "lume/plugins/sitemap.ts"
import transformImages from "lume/plugins/transform_images.ts"
import rehypeExternalLinks from "rehype-external-links"
import rehypeRaw from "rehype-raw"
import Parser, { type Language } from "tree-sitter"
import Bash from "tree-sitter-bash"
import Go from "tree-sitter-go"
import HTML from "tree-sitter-html"
import JavaScript from "tree-sitter-javascript"
import JSON from "tree-sitter-json"
import TypeScript from "tree-sitter-typescript"
import tailwindcss from "./src/_plugins/tailwindcss.ts"

const site = lume({
  dest: "./public",
  src: "./src",
  location: new URL("https://akimo.dev"),
})

const parseCode = (code: string, lang: string) => {
  const languages = {
    go: Go,
    html: HTML,
    javascript: JavaScript,
    json: JSON,
    lua: Lua,
    markdown: Markdown,
    shell: Bash,
    typescript: TypeScript.typescript,
    yaml: YAML,
  } as Record<string, Language>

  if (!(lang in languages)) {
    return `<pre><code>${escapeHtml(code)}</code></pre>`
  }

  const parser = new Parser()
  parser.setLanguage(languages[lang])

  const tree = parser.parse(code)

  const wrapTag = (node: Parser.SyntaxNode, content?: string): string => {
    let openTag = `<span class="ts-${escapeHtml(node.type)}">`,
      closeTag = "</span>"

    if (node.parent === null) {
      openTag = `<pre><code class="lang-${lang}">`
      closeTag = "</code></pre>"
    }

    return openTag + (content || escapeHtml(node.text)) + closeTag
  }

  const nodeToHtml = (node: Parser.SyntaxNode): string => {
    if (node.childCount === 0) {
      return wrapTag(node)
    }

    let content = ""
    let lastIndex = node.startIndex

    for (const child of node.children) {
      content += escapeHtml(
        node.text.slice(
          lastIndex - node.startIndex,
          child.startIndex - node.startIndex,
        ),
      )
      content += nodeToHtml(child)
      lastIndex = child.endIndex
    }

    content += escapeHtml(node.text.slice(lastIndex - node.startIndex))

    return wrapTag(node, content)
  }

  return nodeToHtml(tree.rootNode)
}

site.copy("icon")

site.use(googleFonts({
  cssFile: "style.css",
  fonts:
    "https://fonts.google.com/share?selection.family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700",
}))
site.use(jsx())

interface MdastNode {
  lang?: string
  value: string
}

site.use(mdx({
  rehypeOptions: {
    allowDangerousHtml: true,
    handlers: {
      code: (_: unknown, node: MdastNode) => {
        return {
          type: "raw",
          value: parseCode(node.value, node.lang ?? ""),
        }
      },
    },
  },
  rehypePlugins: [
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
    [
      rehypeRaw,
      {
        passThrough: ["mdxJsxFlowElement", "mdxJsxTextElement"],
      },
    ],
  ],
}))
site.use(minifyHTML())
site.use(redirects())

site.use(tailwindcss())
site.use(robots({
  rules: [
    {
      userAgent: "*",
      disallow: "/external/",
    },
  ],
}))
site.use(transformImages())
site.add("/img")

site.use(multilanguage({
  defaultLanguage: "ja",
  languages: ["ja", "en"],
}))
site.use(sitemap({
  query: "externalUrl=undefined",
}))
site.use(metas())

export default site
