import { siBluesky, siGithub } from "simple-icons"

export const icons = {
  bluesky: siBluesky,
  github: siGithub,
}

export type IconName = keyof typeof icons

interface IconData {
  name: IconName
  size?: number
}

export default ({ name, size = 24 }: IconData) => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
    >
      <path d={icons[name].path} />
    </svg>
  )
}
