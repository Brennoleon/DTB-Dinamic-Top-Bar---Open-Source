"use client"
import { createContext, useRef } from "react"
import type { ReactNode } from "react"
import type { TopBarConfig, TopBarMeta } from "../core/types"
import { createTopBarStore, type TopBarStore } from "../core/store"

export const TopBarContext = createContext<TopBarStore<TopBarMeta> | null>(null)

export function TopBarProvider({ children, initial }: { children: ReactNode; initial?: TopBarConfig }) {
  const storeRef = useRef<TopBarStore<TopBarMeta> | null>(null)
  if (!storeRef.current) storeRef.current = createTopBarStore(initial)
  return <TopBarContext.Provider value={storeRef.current}>{children}</TopBarContext.Provider>
}
