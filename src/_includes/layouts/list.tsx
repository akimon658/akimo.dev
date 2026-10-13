export const layout = "layouts/root.tsx"

export default (data: Lume.Data, _helpers: Lume.Helpers) => {
  return (
    <div className="mx-auto max-w-reader px-6 py-8 md:px-0">
      <h1 className="
        mb-8
        text-center
        text-[26px]
        leading-[1.2]
        font-bold
        md:text-[32px]
      ">
        {data.article_list}
      </h1>
      <data.comp.List
        query={`
        category=blog
        lang=${data.lang}
        layout=layouts/blog.tsx
      `} // Specify the layout to exclude this page from the list
        sort="date=desc"
        lang={data.lang}
        see_more={data.see_more}
      />
    </div>
  )
}
