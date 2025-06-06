const now = new Date()

export default (data: Lume.Data, _helpers: Lume.Helpers) => {
  const comp = data.comp
  const lang = data.lang
  const basePath = lang === "ja" ? "/" : `/${lang}/`

  return (
    <html>
      <head>
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
        dark:bg-gray-950
        dark:text-gray-300
        h-dvh
      ">
        <header className="
          flex
          h-14
          items-center
          mx-auto
          max-w-5xl
        ">
          <a
            href={basePath}
            className="
              dark:hover:bg-gray-900
              hover:bg-gray-50
              ml-4
              my-auto
              px-2
              py-1
              rounded-lg
              text-xl
            "
          >
            akimo.dev
          </a>
        </header>
        <main>{data.children}</main>
        <footer className="
          dark:text-gray-400
          flex
          h-20
          sticky
          text-gray-500
          top-full
        ">
          <div className="
            mx-auto
            my-auto
            text-center
          ">
            {data.alternates && data.alternates.length > 0 &&
              data.alternates.map((alternate) => {
                if (alternate.lang !== lang) {
                  return (
                    <comp.Link
                      key={alternate.lang}
                      href={alternate.url}
                    >
                      {alternate.switch_to}
                    </comp.Link>
                  )
                }
              })}
            <div>
              © {now.getFullYear()} Takumi Akimoto |{" "}
              <comp.Link href="https://github.com/akimon658/akimo.dev">
                {data.source_code}
              </comp.Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
