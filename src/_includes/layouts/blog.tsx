export const layout = "layouts/root.tsx"

export default (data: Lume.Data, _helpers: Lume.Helpers) => {
  const date = data.date
  const locale = data.lang === "ja" ? "ja-JP" : "en-US"
  const meta = (
    <time
      dateTime={date.toISOString()}
      className="text-sm leading-[1.2] text-sub dark:text-sub-dark"
    >
      {date.toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })} {data.published}
    </time>
  )
  const title = (
    <h1 className="
      text-2xl
      leading-[1.2]
      font-black
      text-body
      md:text-[32px]
      dark:text-body-dark
    ">
      {data.title}
    </h1>
  )

  return (
    <div className="mx-auto flex max-w-article flex-col gap-5 px-6 py-8 md:gap-6 md:px-10">
      {data.image
        ? (
          <div className="relative aspect-video overflow-hidden rounded">
            <img
              src={data.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="
                absolute
                inset-0
                bg-[image:linear-gradient(to_bottom,transparent,rgb(0_0_0/0.65))]
              ">
            </div>
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-4">
              <div className="
                text-2xl
                leading-[1.2]
                font-black
                text-on-media
                md:text-[32px]
              ">
                {data.title}
              </div>
              <div className="text-sm leading-[1.2] text-on-media/85">
                {date.toLocaleDateString(locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })} {data.published}
              </div>
            </div>
          </div>
        )
        : (
          <div className="flex flex-col gap-2">
            {title}
            {meta}
          </div>
        )}
      <article className="
        article-body
        rounded
        border-2
        border-line
        bg-card
        p-6
        md:p-10
        dark:border-line-dark
        dark:bg-card-dark
      ">
        {data.children}
      </article>
    </div>
  )
}
