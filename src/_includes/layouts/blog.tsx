export const layout = "layouts/root.tsx"

export default (data: Lume.Data, _helpers: Lume.Helpers) => {
  const date = data.date
  const locale = data.lang === "ja" ? "ja-JP" : "en-US"

  return (
    <article className="
      hover:prose-a:underline
      mx-auto
      dark:prose-a:text-blue-400
      dark:prose-blockquote:border-s-gray-700
      dark:prose-code:bg-vsc-back
      dark:prose-code:text-gray-300
      dark:prose-headings:text-gray-300
      dark:prose-li:marker:text-gray-300
      dark:prose-li:text-gray-300
      dark:prose-p:text-gray-300
      dark:prose-strong:text-gray-300
      prose
      prose-a:font-normal
      prose-a:no-underline
      prose-a:text-blue-600
      prose-code:after:content-none
      prose-code:before:content-none
      prose-code:font-normal
      prose-li:marker:text-gray-700
      prose-pre:bg-vsc-back
      prose-pre:text-vsc-front
      prose-headings:font-normal
      px-4
      visited:dark:prose-a:text-purple-400
      visited:prose-a:text-purple-700
    ">
      <h1>{data.title}</h1>
      <time
        dateTime={`${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`}
        className="
          dark:text-gray-400
          text-gray-500
        "
      >
        {date.toLocaleDateString(locale, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      {data.children}
    </article>
  )
}
