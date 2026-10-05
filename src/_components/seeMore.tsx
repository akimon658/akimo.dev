interface SeeMoreData extends Lume.Data {
  href: string
  see_more: string
}

export default ({ href, see_more }: SeeMoreData) => {
  return (
    <a
      href={href}
      className="
        inline-flex
        items-center
        gap-2
        rounded
        bg-accent
        px-8
        py-3
        text-base
        leading-[1.2]
        text-on-accent
        transition-opacity
        hover:opacity-90
        dark:bg-accent-dark
        dark:text-on-accent-dark
      "
    >
      {see_more}
      <span aria-hidden="true">→</span>
    </a>
  )
}
