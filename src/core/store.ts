import type { TopBarConfig, TopBarState, TopBarMeta } from "./types"
import { createInitialState, mergeState, cloneState } from "./merge"

export type TopBarStore<T extends TopBarMeta = TopBarMeta> = {
  get: () => TopBarState<T>
  set: (next: TopBarConfig<T> | ((prev: TopBarState<T>) => TopBarConfig<T>)) => void
  replace: (next: TopBarState<T>) => void
  reset: () => void
  show: (patch?: TopBarConfig<T>) => void
  hide: () => void
  push: (patch: TopBarConfig<T>) => string
  pop: (id?: string) => void
  clearStack: () => void
  subscribe: (fn: () => void) => () => void
}

const isServer = typeof window === "undefined"

function uid() {
  if (!isServer && typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID()
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function createTopBarStore<T extends TopBarMeta = TopBarMeta>(initial?: TopBarConfig<T>): TopBarStore<T> {
  const baseState = mergeState(createInitialState<T>(), initial ?? {})
  let state = cloneState(baseState)

  const stack: { id: string; snapshot: TopBarState<T> }[] = []
  const listeners = new Set<() => void>()
  const notify = () => listeners.forEach((l) => l())

  return {
    get: () => state,

    set: (next) => {
      const patch = typeof next === "function" ? next(state) : next
      state = mergeState(state, patch)
      notify()
    },

    replace: (next) => {
      state = next
      notify()
    },

    reset: () => {
      state = cloneState(baseState)
      stack.length = 0
      notify()
    },

    show: (patch) => {
      state = mergeState(state, { ...patch, visible: true })
      notify()
    },

    hide: () => {
      state = { ...state, visible: false }
      notify()
    },

    push: (patch) => {
      const id = uid()
      stack.push({ id, snapshot: cloneState(state) })
      state = mergeState(state, { ...patch, visible: true })
      notify()
      return id
    },

    pop: (id) => {
      if (stack.length === 0) return

      if (!id) {
        const last = stack.pop()!
        state = last.snapshot
        notify()
        return
      }

      const idx = stack.findIndex((x) => x.id === id)
      if (idx === -1) return

      const isCurrent = idx === stack.length - 1
      const snap = stack[idx].snapshot
      stack.splice(idx, 1)

      if (isCurrent) {
        state = snap
        notify()
      }
    },

    clearStack: () => {
      if (stack.length === 0) return
      stack.length = 0
      notify()
    },

    subscribe: (fn) => {
      listeners.add(fn)
      return () => { listeners.delete(fn) }
    }
  }
}
