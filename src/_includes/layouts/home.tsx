import Icon, { type IconName, icons } from "../../_components/icon.tsx"

export const layout = "layouts/root.tsx"

interface SocialLink {
  border?: boolean
  href: string
  icon: IconName
  label: string
}

export default (data: Lume.Data, _helpers: Lume.Helpers) => {
  const comp = data.comp
  const social: SocialLink[] = data.social

  return (
    <>
      <div className="
        mx-auto
        flex
        max-w-reader
        flex-col
        px-6
        py-6
        md:flex-row
        md:items-center
        md:gap-20
        md:py-12
      ">
        <div className="flex flex-col items-center gap-4">
          <img
            src="/img/animated/icon.webp"
            alt=""
            width="128"
            height="128"
          />
          <h1 className="
            text-[40px]
            leading-[1.2]
            font-black
            text-body
            dark:text-body-dark
          ">
            {data.author_name}
          </h1>
          <div className="flex flex-col items-center gap-4">
            {social.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  px-6
                  py-3
                  text-base
                  leading-[1.2]
                  text-on-media
                  transition-[filter]
                  hover:brightness-125
                  ${link.border ? "border border-on-brand" : ""}
                `}
                style={{
                  "background-color": `#${icons[link.icon].hex}`,
                }}
              >
                <Icon name={link.icon} size={18} />
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="w-full py-8">
          <h2 className="
            text-center
            text-[26px]
            leading-[1.2]
            font-bold
            md:text-left
            md:text-[32px]
          ">
            {data.affiliations_heading}
          </h2>
          <ul className="mt-8 flex flex-col gap-2">
            {data.affiliations.map((affiliation: Lume.Data) => (
              <comp.AffiliationItem
                key={affiliation.title}
                {...affiliation}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-reader px-6 py-8 md:px-0">
        <h2 className="
          mb-8
          text-center
          text-[26px]
          leading-[1.2]
          font-bold
          md:text-[32px]
        ">
          {data.wrote_articles}
        </h2>
        <comp.List
          query={`
            category=blog
            lang=${data.lang}
            layout=layouts/blog.tsx
          `}
          sort="date=desc"
          limit={6}
          lang={data.lang}
          see_more={data.see_more}
        />
      </div>
    </>
  )
}
