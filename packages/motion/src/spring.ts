import { spring } from 'svelte/motion'
import type { Ref } from 'vue-demi'
import { customRef, shallowRef, unref } from 'vue-demi'
import type { MaybeRef } from './types'
import { tryOnScopeDispose } from './utils'

interface SpringOpts {
  stiffness?: number
  damping?: number
  precision?: number
}

export { spring }

export const useSpring = <T = any>(value: MaybeRef<T>, opts: SpringOpts = {}): Ref<T> => {
  const dummy = shallowRef(unref(value))
  const sub = spring(dummy.value, opts)
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
