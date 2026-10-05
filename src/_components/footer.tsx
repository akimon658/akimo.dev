interface FooterData extends Lume.Data {
  alternates?: { lang: string; switch_to: string; url: string }[]
  comp: Lume.Components
  lang?: string
  source_code: string
}

export default (
  { alternates, comp, lang, source_code }: FooterData,
) => {
  return (
    <footer className="w-full">
      <div className="
        mx-auto
        flex
        w-full
        max-w-[1440px]
        flex-wrap
        items-center
        justify-center
        gap-1
        px-6
        py-8
        text-sm
        leading-[1.2]
        md:px-20
      ">
        {alternates && alternates.length > 0 &&
          alternates.map((alternate) => {
            if (alternate.lang !== lang) {
              return (
                <comp.Link
                  key={alternate.lang}
                  href={alternate.url}
                  className="text-link dark:text-link-dark"
                >
                  {alternate.switch_to}
                </comp.Link>
              )
            }
          })}
        <span className="text-sub dark:text-sub-dark">|</span>
        <comp.Link
          href="https://github.com/akimon658/akimo.dev"
          className="text-link dark:text-link-dark"
        >
          {source_code}
        </comp.Link>
      </div>
    </footer>
  )
}
