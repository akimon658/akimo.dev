interface ListData extends Lume.Data {
  limit?: number
  query: string
  sort: string
}

export default (
  { comp, lang, search, limit, query, see_more, sort }: ListData,
) => {
  const posts = search.pages(query, sort)
  if (!limit || limit > posts.length) {
    limit = posts.length
  }
  const omitted = posts.length > limit
  const pathPrefix = lang && lang !== "ja" ? "/" + lang : ""

  return (
    <>
      <div className="
        grid
        grid-cols-1
        gap-4
        md:grid-cols-3
        md:gap-5
      ">
        {posts.slice(0, limit).map((post) => (
          <comp.Card
            key={post.url}
            href={post.externalUrl ? post.externalUrl : post.url}
            image={post.image}
            title={post.title}
            lang={post.lang}
            date={post.date}
          />
        ))}
      </div>
      {omitted &&
        (
          <div className="mt-8 flex justify-center">
            <comp.SeeMore href={pathPrefix + "/blog/"} see_more={see_more} />
          </div>
        )}
    </>
  )
}
