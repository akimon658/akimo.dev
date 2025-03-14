---
title: "Hugo adds unnecessary whitespace after a link"
date: 2022-01-25T18:40:00+09:00
description: "I don't like to end with no newlines, but there are no other solutions"
tags: ["Hugo"]
lang: "en"
oldUrl: "/en/p/2022/hugo-whitespace/"
url: "/blog/hugo-whitespace/"
id: hugo-whitespace
---

I'm running this blog with [Hugo](https://gohugo.io).
I love it because it's super fast and functional, but I had a problem.

## Issue example
```markdown
This is [test](https://example.com), just a [sample](https://sample.test)
```

This would output...

![unnecessary whitespace](/img/unnecessary-whitespace.avif)

like this.
It rendered unnecessary space before comma or period.

## Cause
It was because `layouts/_default/_markup/render-link.html` ended with a newline.

### What is `lender-link.html`
It is used with [Render Hooks](https://gohugo.io/getting-started/configuration-markup#markdown-render-hooks), which overrides default HTML rendering.
For example, we can add `target="_blank"` to external links by using `lender-link.html`.
However, [goldmark](https://github.com/yuin/goldmark) adds whitespace if the template ends with a newline.

`render-link.html` of [Fuji](https://github.com/dsrkafuu/hugo-theme-fuji/), the theme I'm using as a base of this blog, ends with no newlines.
However, I added a newline to the template by myself when I customize it.
Some editor adds a newline of the end automatically, so please be careful...
