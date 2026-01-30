"use client"
import type { CSSProperties } from "react"
import { useTopBar } from "../react/useTopBar"
import type { TopBarButton } from "../core/types"

function ButtonRenderer({ btn }: { btn: TopBarButton }) {
  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    opacity: btn.disabled ? 0.5 : 1,
    pointerEvents: btn.disabled ? "none" : "auto",
    textDecoration: "none",
    color: "inherit",
    background: "transparent",
    border: "none",
    padding: 0,
    cursor: btn.disabled ? "not-allowed" : "pointer",
    ...btn.style
  }

  return (
    <button
      type="button"
      onClick={btn.onClick}
      disabled={btn.disabled}
      aria-label={btn.ariaLabel ?? btn.id}
      style={style}
      className={btn.className}
    >
      {btn.leftIcon}{btn.content}{btn.rightIcon}
    </button>
  )
}

export function TopBarDefault() {
  const { state } = useTopBar()
  if (!state.visible) return null

  const s = state.style
  const l = state.layout
  const hasBlur = typeof s.blur === "number" && s.blur > 0

  const headerStyle: CSSProperties = {
    height: s.height ?? 64,
    paddingLeft: s.paddingX ?? 16,
    paddingRight: s.paddingX ?? 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: s.gap ?? 12,
    background: s.background ?? "#111",
    color: s.foreground ?? "#fff",
    border: s.border,
    borderRadius: s.radius ?? 0,
    opacity: s.opacity ?? 1,
    boxShadow: s.shadow,
    position: s.sticky ? "sticky" : "relative",
    top: s.sticky ? 0 : undefined,
    zIndex: s.zIndex ?? 50,
    transition: s.transitions ? "all 180ms ease" : undefined,
    ...(hasBlur
      ? { backdropFilter: `blur(${s.blur}px) saturate(${s.backdropSaturate ?? 1}) brightness(${s.backdropBrightness ?? 1})` }
      : {}),
    ...s.style
  }

  return (
    <header className={s.className} style={headerStyle}>
      {l.floating}
      <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: "0 0 auto" }}>
          {l.left}
          {l.leftButtons?.map((b) => <ButtonRenderer key={b.id} btn={b} />)}
        </div>
        <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {l.center ?? (
            <div style={{ minWidth: 0, textAlign: "center" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {l.beforeTitle}{l.title}{l.afterTitle}
              </div>
              {l.subtitle}
            </div>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: "0 0 auto" }}>
          {l.rightButtons?.map((b) => <ButtonRenderer key={b.id} btn={b} />)}
          {l.right}
        </div>
      </div>
      {l.below}
    </header>
  )
}
