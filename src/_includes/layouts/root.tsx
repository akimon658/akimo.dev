const now = new Date()

export default (data: Lume.Data, _helpers: Lume.Helpers) => {
  const comp = data.comp

  return (
    <html lang={data.lang === "ja" || !data.lang ? "ja" : data.lang}>
      <head>
        <meta charset="utf-8" />
        <title>{data.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon/favicon.ico" />
        <link
          rel="stylesheet"
          href={`/style.css?var=${now.getTime()}`}
        />
        <link rel="canonical" href={"https://akimo.dev" + data.url} />
      </head>
      <body className="
        dark:bg-surface-dark
        dark:text-body-dark
        flex
        min-h-dvh
        flex-col
        bg-surface
        text-body
      ">
        <comp.Header
          url={data.url}
          lang={data.lang}
          nav_home={data.nav_home}
          nav_articles={data.nav_articles}
        />
        <main className="flex-1">{data.children}</main>
        <comp.Footer
          alternates={data.alternates}
          lang={data.lang}
          source_code={data.source_code}
        />
      </body>
    </html>
  )
}
