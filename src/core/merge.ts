import type { TopBarConfig, TopBarState, TopBarMeta } from "./types"

export function cloneState<T extends TopBarMeta>(s: TopBarState<T>): TopBarState<T> {
  return {
    visible: s.visible,
    style: { ...s.style },
    layout: { ...s.layout },
    meta: { ...s.meta }
  }
}

export function createInitialState<T extends TopBarMeta = TopBarMeta>(): TopBarState<T> {
  return {
    visible: false,
    style: {
      height: 64,
      paddingX: 16,
      gap: 12,
      background: "#111",
      foreground: "#fff",
      radius: 0,
      opacity: 1,
      sticky: true,
      zIndex: 50,
      transitions: true
    },
    layout: {},
    meta: {} as T
  }
}

export function mergeState<T extends TopBarMeta>(prev: TopBarState<T>, patch: TopBarConfig<T>): TopBarState<T> {
  const next = cloneState(prev)

  if (patch.visible !== undefined) next.visible = patch.visible
  if (patch.style) Object.assign(next.style, patch.style)
  if (patch.meta) Object.assign(next.meta, patch.meta)

  const pl = patch.layout
  if (pl) {
    const nl = next.layout
    if (pl.left !== undefined) nl.left = pl.left
    if (pl.center !== undefined) nl.center = pl.center
    if (pl.right !== undefined) nl.right = pl.right
    if (pl.title !== undefined) nl.title = pl.title
    if (pl.subtitle !== undefined) nl.subtitle = pl.subtitle
    if (pl.beforeTitle !== undefined) nl.beforeTitle = pl.beforeTitle
    if (pl.afterTitle !== undefined) nl.afterTitle = pl.afterTitle
    if (pl.below !== undefined) nl.below = pl.below
    if (pl.floating !== undefined) nl.floating = pl.floating
    if ("leftButtons" in pl) nl.leftButtons = pl.leftButtons
    if ("rightButtons" in pl) nl.rightButtons = pl.rightButtons
  }

  return next
}
