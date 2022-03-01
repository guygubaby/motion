import type { ComputedRef, Ref, UnwrapRef } from 'vue'
import { computed, ref, unref, watch } from 'vue'
import { tweened } from 'svelte/motion'
import { tryOnScopeDispose } from '../utils/index'

interface Options<T> {
  delay?: number
  duration?: number | ((from: T, to: T) => number)
  easing?: (t: number) => number
  interpolate?: (a: T, b: T) => (t: number) => T
}

export function useTweened<T>(value: Ref<T>, defaults: Options<T> = {}): ComputedRef<UnwrapRef<T>> {
  const sourceValue = computed(() => unref(value))
  const outValue = ref<T>(unref(value))

  const p = tweened(sourceValue.value, defaults)
  // @ts-ignore
  const unsubscribe = p.subscribe(val => outValue.value = val)

  watch(sourceValue, (val) => {
    p.set(val)
  }, {
    immediate: true,
  })

  tryOnScopeDispose(unsubscribe)

  return computed(() => outValue.value)
}
