import { spring } from 'svelte/motion'
import type { Ref } from 'vue'
import { customRef, shallowRef, unref } from 'vue'
import { tryOnScopeDispose } from './utils'

interface SpringOpts {
  stiffness?: number
  damping?: number
  precision?: number
}

export { spring }

export const useSpring = <T=any>(value: Ref<T> | T, opts: SpringOpts = {}) => {
  const dummy = shallowRef(unref(value))
  const sub = spring(dummy.value, opts)
  const unsub = sub.subscribe(val => dummy.value = val)
  tryOnScopeDispose(unsub)

  const outValue = customRef<T>((track, trigger) => {
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

  return outValue
}
