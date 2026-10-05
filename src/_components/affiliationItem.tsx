interface AffiliationData extends Lume.Data {
  color: string
  period: string
  subtitle: string
  title: string
}

const backgrounds: Record<string, string> = {
  isct: "bg-brand-affiliation-isct",
  trap: "bg-brand-affiliation-trap",
  kirara: "bg-brand-affiliation-kirara",
  pixiv: "bg-brand-affiliation-pixiv",
}

export default ({ color, period, subtitle, title }: AffiliationData) => {
  return (
    <li
      className={`
        flex
        flex-col
        gap-1
        rounded
        border-2
        border-line
        px-4
        py-4
        md:flex-row
        md:items-center
        md:gap-4
        md:px-6
        dark:border-line-dark
        ${backgrounds[color] ?? ""}
      `}
    >
      <div className="flex flex-col gap-1 md:flex-1">
        <div className="text-base leading-[1.2] font-bold text-on-media">
          {title}
        </div>
        <div className="text-sm leading-[1.2] text-on-media-soft">
          {subtitle}
        </div>
      </div>
      <div className="text-sm leading-[1.2] text-on-media-faint md:text-right">
        {period}
      </div>
    </li>
  )
}
