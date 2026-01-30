import type { ReactNode, CSSProperties } from "react"

export type TopBarMeta = Record<string, unknown>

export type TopBarButton = {
  id: string
  onClick?: () => void
  disabled?: boolean
  ariaLabel?: string
  content?: ReactNode
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  style?: CSSProperties
  className?: string
}

export type TopBarStyle = {
  height?: number
  paddingX?: number
  gap?: number
  background?: string
  foreground?: string
  border?: string
  radius?: number
  shadow?: string
  blur?: number
  opacity?: number
  sticky?: boolean
  zIndex?: number
  backdropSaturate?: number
  backdropBrightness?: number
  transitions?: boolean
  className?: string
  style?: CSSProperties
}

export type TopBarLayout = {
  left?: ReactNode
  center?: ReactNode
  right?: ReactNode
  title?: ReactNode
  subtitle?: ReactNode
  beforeTitle?: ReactNode
  afterTitle?: ReactNode
  below?: ReactNode
  floating?: ReactNode
  leftButtons?: readonly TopBarButton[]
  rightButtons?: readonly TopBarButton[]
}

export type TopBarConfig<T extends TopBarMeta = TopBarMeta> = {
  visible?: boolean
  style?: TopBarStyle
  layout?: TopBarLayout
  meta?: T
}

export type TopBarState<T extends TopBarMeta = TopBarMeta> = {
  visible: boolean
  style: TopBarStyle
  layout: TopBarLayout
  meta: T
}
