export const layout = "layouts/root.tsx"

type Icon = {
  height: string
  href: string
  srcDark: string
  srcLight: string
  title: string
  width: string
}

export default (data: Lume.Data, _helpers: Lume.Helpers) => {
  const comp = data.comp
  const icons: Icon[] = [
    {
      height: "24",
      href: "https://x.com/akimon658",
      srcDark: "/icon/x_white.png",
      srcLight: "/icon/x_black.png",
      title: "X",
      width: "23",
    },
    {
      height: "24",
      href: "https://github.com/akimon658",
      srcDark: "/icon/github_white.svg",
      srcLight: "/icon/github_black.svg",
      title: "GitHub",
      width: "24.5",
    },
    {
      height: "24",
      href: "https://atcoder.jp/users/akimon658",
      srcDark: "/icon/atcoder_white.png",
      srcLight: "/icon/atcoder_black.png",
      title: "AtCoder",
      width: "24.32",
    },
  ]

  return (
    <>
      <div className="
        flex
        flex-col
        gap-8
        items-center
        justify-center
        md:flex-row
        md:gap-14
        mt-8
      ">
        <img
          src="/img/animated/icon.webp"
          height="200"
          width="200"
        />
        <div className="
          flex
          flex-col
          gap-2
          max-w-80
          sm:max-w-none
          text-xl
        ">
          <div>
            <h1 className="
            font-bold
            text-2xl
          ">
              {data.author_name}
            </h1>
            <div className="
            dark:text-gray-400
            text-gray-500
          ">
              @akimon658
            </div>
          </div>
          <div>
            {data.author_affiliation}
          </div>
          <div className="
            flex
            gap-4
          ">
            {icons.map((icon) => (
              <comp.Link
                key={icon.href}
                href={icon.href}
                title={icon.title}
              >
                <picture className="h-6">
                  <source
                    srcSet={icon.srcDark}
                    media="(prefers-color-scheme: dark)"
                  />
                  <img
                    src={icon.srcLight}
                    height={icon.height}
                    width={icon.width}
                  />
                </picture>
              </comp.Link>
            ))}
          </div>
        </div>
      </div>
      <h2 className="
        mt-8
        text-2xl
        text-center
      ">
        {data.articles}
      </h2>
      <comp.List
        query={`
          category=blog
          lang=${data.lang}
          layout=layouts/blog.tsx
        `}
        sort="date=desc"
        limit={8}
      />
    </>
  )
}
