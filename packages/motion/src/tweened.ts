import type { ComputedRef, Ref, UnwrapRef } from 'vue'
import { computed, ref, watch } from 'vue'
import { tweened } from 'svelte/motion'
import { tryOnScopeDispose } from './utils'

export { tweened } from 'svelte/motion'

export interface TweenedOptions<T> {
  delay?: number
  duration?: number | ((from: T, to: T) => number)
  easing?: (t: number) => number
  interpolate?: (a: T, b: T) => (t: number) => T
}

export function useTweened<T>(source: Ref<T> | ComputedRef<T>, defaults: TweenedOptions<T> = {}): Ref<UnwrapRef<T>> {
  const sourceValue = computed(() => source.value)
  const outValue = ref<T>(source.value)

  const sub = tweened(sourceValue.value, defaults)
  // @ts-ignore
  const unsubscribe = sub.subscribe(val => outValue.value = val)

  watch(sourceValue, (val) => {
    sub.set(val)
  }, {
    immediate: true,
  })

  tryOnScopeDispose(unsubscribe)

  return outValue
}
