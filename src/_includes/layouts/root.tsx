const now = Date.now()

export default (
  { comp, title, children }: Lume.Data,
  _helpers: Lume.Helpers,
) => (
  <html>
    <head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/icon/favicon.ico" />
      <link
        rel="stylesheet"
        href={`/style.css?var=${now}`}
      />
      <link rel="stylesheet" href="/code_highlight.css" />
    </head>
    <body className="h-dvh">
      <header className="flex h-14 items-center mx-auto max-w-5xl">
        <a href="/" className="ml-4 my-auto text-xl">akimo.dev</a>
      </header>
      <main>{children}</main>
      <footer className="
        flex
        h-20
        sticky
        text-gray-500
        top-full
      ">
        <div className="
          mx-auto
          my-auto
        ">
          <div className="text-center">
            © 2024 Takumi Akimoto
          </div>
          <div>
            <comp.Link href="/privacy-policy/">プライバシーポリシー</comp.Link>
            {" "}
            |{" "}
            <comp.Link href="https://github.com/akimon658/akimon658.github.io">
              ソースコード
            </comp.Link>
          </div>
        </div>
      </footer>
    </body>
  </html>
)
