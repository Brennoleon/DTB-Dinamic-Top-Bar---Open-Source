"use client"
import { useContext, useMemo, useSyncExternalStore } from "react"
import { TopBarContext } from "./TopBarProvider"
import type { TopBarStore } from "../core/store"
import type { TopBarMeta } from "../core/types"

export function useTopBar<T extends TopBarMeta = TopBarMeta>() {
  const store = useContext(TopBarContext) as TopBarStore<T> | null
  if (!store) throw new Error("TopBarProvider missing")

  const state = useSyncExternalStore(store.subscribe, store.get, store.get)

  return useMemo(() => ({
    state,
    set: store.set,
    replace: store.replace,
    reset: store.reset,
    show: store.show,
    hide: store.hide,
    push: store.push,
    pop: store.pop,
    clearStack: store.clearStack
  }), [store, state])
}
