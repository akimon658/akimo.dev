interface CardData extends Lume.Data {
  date?: Date
  href: string
  image?: string
  title: string
}

export default ({ date, href, image, lang, title }: CardData) => {
  const isExternal = href.startsWith("http")
  const host = isExternal ? new URL(href).hostname : undefined
  const locale = lang === "ja" ? "ja-JP" : "en-US"

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="
        group
        relative
        flex
        aspect-4/3
        flex-col
        justify-end
        overflow-hidden
        rounded
        border-2
        border-line
        bg-placeholder
        transition-colors
        hover:border-accent
        dark:border-line-dark
        dark:bg-placeholder-dark
        dark:hover:border-accent-dark
      "
    >
      {image && (
        <img
          src={image}
          transform-images="avif 800x600"
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      )}
      <div className="
          absolute
          inset-0
          bg-[image:linear-gradient(to_bottom,transparent,rgb(0_0_0/0.65))]
          transition-opacity
          group-hover:opacity-90
        ">
      </div>
      <div className="relative flex flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-base leading-[1.2] font-bold text-on-media">
          {title}
        </h3>
        <div className="flex items-center justify-between gap-2">
          {date && (
            <time
              dateTime={date.toISOString()}
              className="text-sm leading-[1.2] text-on-media/85"
            >
              {date.toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
          {host && (
            <span className="ml-auto truncate text-xs leading-[1.2] text-on-media/75">
              {host}
            </span>
          )}
        </div>
      </div>
    </a>
  )
}
