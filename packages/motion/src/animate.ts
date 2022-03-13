import type { MotionInstance, MotionVariants } from '@vueuse/motion'
import { useMotion } from '@vueuse/motion'
import type { Directive, DirectiveBinding } from 'vue-demi'
import { del as __del, set as __set, computed, ref, shallowReactive } from 'vue-demi'
import { MODIFILER_JOINER } from './constants'

export { useMotion }

export type MotionInstanceBindings<T> = Record<string, MotionInstance<T>>

export const motionState = shallowReactive<MotionInstanceBindings<any>>({})

export const useMotionInstance = (modifier: string) => {
  return computed(() => motionState[modifier])
}

export const defineVariants = (motionVariants: MotionVariants): MotionVariants => motionVariants

const MOTION_INSTANCE_KEY = Symbol('motion-instance')

export const defineDirective = (): Directive<HTMLElement | SVGElement, any> => {
  const register = (
    el: HTMLElement | SVGElement,
    binding: DirectiveBinding,
  ) => {
    // Get instance key if possible (binding value or element key in case of v-for's)
    const key = Object.keys(binding.modifiers).join(MODIFILER_JOINER)

    // Cleanup previous motion instance if it exists
    if (key && motionState[key]) motionState[key].stop()

    // Initialize variants with argument
    const variantsRef = ref<MotionVariants>({})

    // Set variants from v-motion binding
    if (typeof binding.value === 'object') variantsRef.value = binding.value

    // Create motion instance
    const motionInstance = useMotion(el, variantsRef)

    // Pass the motion instance via the local element
    // @ts-ignore
    el[MOTION_INSTANCE_KEY] = motionInstance

    // Set the global state reference if the name is set through v-motion="`value`"
    if (key) __set(motionState, key, motionInstance)
  }

  const unregister = (el: HTMLElement | SVGElement, binding: DirectiveBinding) => {
    const key = Object.keys(binding.modifiers).join(MODIFILER_JOINER)
    // Cleanup the unregistered element motion instance
    // @ts-ignore
    if (el[MOTION_INSTANCE_KEY]) el[MOTION_INSTANCE_KEY].stop()
    if (key) __del(motionState, key)
  }

  return {
    // for vue3
    created: register,
    unmounted: unregister,

    // for vue2
    // @ts-expect-error
    bind: register,
    unbind: unregister,
  }
}
