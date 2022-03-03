import type { Ref } from 'vue'
import { customRef, shallowRef, unref } from 'vue'
import { tweened } from 'svelte/motion'
import { tryOnScopeDispose } from './utils'
import type { MaybeRef } from './types'

export { tweened }

export interface TweenedOptions<T> {
  delay?: number
  duration?: number | ((from: T, to: T) => number)
  easing?: (t: number) => number
  interpolate?: (a: T, b: T) => (t: number) => T
}

export function useTweened<T>(source: MaybeRef<T>, opts: TweenedOptions<T> = {}): Ref<T> {
  const dummy = shallowRef(unref(source))
  const sub = tweened(dummy.value, opts)
  const unsub = sub.subscribe(val => dummy.value = val)
  tryOnScopeDispose(unsub)

  return customRef<T>((track, trigger) => {
    return {
      get() {
        track()
        return dummy.value
      },
      set(val) {
        sub.set(val)
        trigger()
      },
    }
  })
}
