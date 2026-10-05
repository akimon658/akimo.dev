interface HeaderData extends Lume.Data {
  lang?: string
  nav_articles: string
  nav_home: string
  url: string
}

export default ({ lang, nav_articles, nav_home, url }: HeaderData) => {
  const basePath = lang === "ja" || !lang ? "/" : `/${lang}/`
  const articlesPath = `${basePath}blog/`
  const navItems = [
    { active: url === basePath, href: basePath, label: nav_home },
    {
      active: url.startsWith(articlesPath),
      href: articlesPath,
      label: nav_articles,
    },
  ]

  return (
    <header className="w-full">
      <div className="
        mx-auto
        flex
        h-16
        w-full
        max-w-[1440px]
        items-center
        justify-between
        px-6
        md:px-20
      ">
        <a
          href={basePath}
          className="
            text-xl
            leading-[1.2]
            font-bold
            text-body
            dark:text-body-dark
          "
        >
          akimo.dev
        </a>
        <nav className="flex items-center gap-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`
                rounded
                px-4
                py-2
                text-base
                leading-[1.2]
                transition-colors
                ${
                item.active
                  ? "bg-subtle dark:bg-subtle-dark"
                  : "hover:bg-subtle dark:hover:bg-subtle-dark"
              }
              `}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
