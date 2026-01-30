"use client"
import { useEffect, useRef } from "react"
import type { TopBarConfig, TopBarMeta } from "../core/types"
import { useTopBar } from "./useTopBar"

export function useTopBarStack<T extends TopBarMeta = TopBarMeta>(patch: TopBarConfig<T> | null) {
  const { push, pop } = useTopBar<T>()
  const idRef = useRef<string | null>(null)

  useEffect(() => {
    if (!patch) return
    const id = push(patch)
    idRef.current = id
    return () => {
      if (idRef.current) {
        pop(idRef.current)
        idRef.current = null
      }
    }
  }, [patch, push, pop])
}
