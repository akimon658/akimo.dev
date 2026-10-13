// Tree-sitter syntax highlighting as a rehype plugin.
//
// Direct port of the `parseCode` logic from the former Lume `_config.ts`:
// the same grammars, the same `<pre><code class="lang-*">` wrapper and the
// same `<span class="ts-*">` node annotations, so the existing
// `src/styles/vscode.css` keeps working unchanged.
//
// Differences from the Lume version:
// - Runs on hast (`pre > code.language-*`) instead of mdast, because Astro
//   applies rehype plugins after remark-rehype. Inline code is untouched,
//   exactly like before (only fenced blocks were highlighted).
// - Builds hast nodes instead of HTML strings, so no `escape-html` round
//   trip or `rehype-raw` pass is needed; the serializer escapes text nodes.
// - Like the original, byte offsets from tree-sitter are used to slice the
//   source string. This is kept byte-for-byte compatible on purpose.

import Lua from "@tree-sitter-grammars/tree-sitter-lua";
import Markdown from "@tree-sitter-grammars/tree-sitter-markdown";
import YAML from "@tree-sitter-grammars/tree-sitter-yaml";
import Parser from "tree-sitter";
import Bash from "tree-sitter-bash";
import Go from "tree-sitter-go";
import HTML from "tree-sitter-html";
import JavaScript from "tree-sitter-javascript";
import JSON from "tree-sitter-json";
import TypeScript from "tree-sitter-typescript";
import { visit } from "unist-util-visit";

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
};

const parserCache = new Map();

function highlighterFor(lang) {
  if (!Object.hasOwn(languages, lang)) {
    return undefined;
  }
  if (!parserCache.has(lang)) {
    const parser = new Parser();
    parser.setLanguage(languages[lang]);
    parserCache.set(lang, parser);
  }
  return parserCache.get(lang);
}

const span = (type, children) => ({
  type: "element",
  tagName: "span",
  properties: { className: [`ts-${type}`] },
  children,
});

const text = (value) => ({ type: "text", value });

// Expansion of a node's children: gap text interleaved with wrapped nodes.
function childrenToHast(tsNode) {
  const children = [];
  let lastIndex = tsNode.startIndex;

  for (const child of tsNode.children) {
    const gap = tsNode.text.slice(
      lastIndex - tsNode.startIndex,
      child.startIndex - tsNode.startIndex,
    );
    if (gap !== "") {
      children.push(text(gap));
    }
    children.push(nodeToHast(child));
    lastIndex = child.endIndex;
  }

  const tail = tsNode.text.slice(lastIndex - tsNode.startIndex);
  if (tail !== "") {
    children.push(text(tail));
  }

  return children;
}

function nodeToHast(tsNode) {
  if (tsNode.childCount === 0) {
    return span(tsNode.type, [text(tsNode.text)]);
  }
  return span(tsNode.type, childrenToHast(tsNode));
}

function highlightToHast(code, lang) {
  const parser = highlighterFor(lang);
  const properties =
    parser === undefined ? {} : { className: [`lang-${lang}`] };
  const children =
    parser === undefined
      ? [text(code)]
      : childrenToHast(parser.parse(code).rootNode);

  return {
    type: "element",
    tagName: "pre",
    properties: {},
    children: [
      { type: "element", tagName: "code", properties, children },
    ],
  };
}

function textContent(node) {
  if (node.type === "text") {
    return node.value;
  }
  if (node.type === "element" && Array.isArray(node.children)) {
    return node.children.map(textContent).join("");
  }
  return "";
}

export function rehypeTreeSitter() {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName !== "pre" || parent === null || index === null) {
        return;
      }
      const code = node.children.find(
        (child) => child.type === "element" && child.tagName === "code",
      );
      if (code === undefined) {
        return;
      }
      const classes = [...(code.properties?.className ?? [])].map(String);
      const langClass = classes.find((c) => c.startsWith("language-"));
      const lang = langClass?.slice("language-".length) ?? "";
      parent.children[index] = highlightToHast(textContent(code), lang);
    });
  };
}
