interface LinkCardData extends Lume.Data {
  href: string
  title: string
}

export default ({ href, title }: LinkCardData) => {
  const host = new URL(href).hostname

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        my-5
        block
        rounded
        border
        border-line
        bg-card
        text-body
        transition-colors
        hover:bg-subtle
        hover:no-underline
        dark:border-line-dark
        dark:bg-card-dark
        dark:text-body-dark
        dark:hover:bg-subtle-dark
      "
    >
      <div className="flex flex-col gap-2 p-4">
        <div className="
          text-base
          leading-[1.5]
          font-bold
          text-body
          dark:text-body-dark
        ">
          {title}
        </div>
        <div className="
          flex
          items-center
          gap-2
          text-xs
          leading-[1.2]
          text-sub
          dark:text-sub-dark
        ">
          {host}
        </div>
      </div>
    </a>
  )
}
