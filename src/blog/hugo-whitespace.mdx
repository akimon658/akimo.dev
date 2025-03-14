---
title: "Hugo でリンクの後に余分な空白が挿入されてしまう現象"
date: 2022-01-24T08:55:00+09:00
description: "Hugo そのものの不具合ではありませんが、まぁまぁ困ったので解決策を調べました。"
draft: false
tags: ["Hugo"]
oldUrl: "/p/2022/hugo-whitespace/"
id: hugo-whitespace
---

このブログは [Hugo](https://gohugo.io) を使って運用しています。
多機能なのに高速でめちゃくちゃ便利なんですが、リンクを貼ると後ろに余計な半角スペースが入ってしまって気持ち悪かったので原因を調べました。

## 問題点
```markdown
This is [test](https://example.com), just a [sample](https://sample.test).
```

これが

![余分なスペースの例](/img/unnecessary-whitespace.avif)

こうなる。（カンマ、ピリオドの前に余計なスペースが入っている）

※紛らわしいんですが、この記事で半角スペースが入っているのは僕が日本語とアルファベットの間に空白を入れる派だからであって上記の問題は解決してあります。
多分

## 原因
`layouts/_default/_markup/render-link.html` の最後に改行が入っているせいでした。

### `render-link.html` について
Hugo には [Render Hooks](https://gohugo.io/getting-started/configuration-markup#markdown-render-hooks) という機能があります。
HTML の生成に割り込み、例えば `render-link.html` を使うと外部リンクを `target="_blank"` で開くといったことができる機能です。
ただ、Hugo 内部で使われている [goldmark](https://github.com/yuin/goldmark) という Markdown パーサーのバグなのか仕様なのかスペースが入ってしまうみたいです。

当サイトのテーマのベースになっている [Fuji](https://github.com/dsrkafuu/hugo-theme-fuji/) ではしっかり対処されていましたが、アレンジする時に自分で改行を入れたので自業自得でした。

## あとがき
[同じような issue](https://github.com/gohugoio/hugo/issues/6832) が既に立っていました。
各自で改行を入れないように気をつけてくれというスタンスみたいで、Vim を使っていると勝手に末尾に改行が入ってしまうので面倒臭いです。
