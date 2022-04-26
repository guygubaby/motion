import { assert } from '@bryce-loskie/utils'
import { gsap } from 'gsap'
import type { Directive, DirectiveBinding } from 'vue-demi'
import { del as __del, set as __set, computed, getCurrentInstance, onMounted, shallowReactive, unref } from 'vue-demi'
import type { MaybeRef } from './types'
import { MODIFILER_JOINER } from './constants'
import { tryOnScopeDispose } from './utils/index'

export * as rawGsap from 'gsap'

/**
 * Assitant function to create a GSAP tweenvars
 * @param tweenVars - The tween vars to create
 * @returns The tween vars
 */
export const defineTweenVars = (...tweenVars: GSAPTweenVars[]) => tweenVars

/**
 * Using the `gsap` library, you can create a tween that will be applied to a DOM element.
 * @param target The DOM element to apply the tween to.
 * @param tweenVars optional tween variables
 * @returns gsap timeline object
 */
export const useGsapTimeline = <T extends HTMLElement | SVGElement | null>(target: MaybeRef<T>, tweenVars?: GSAPTweenVars[]) => {
  const tl = gsap.timeline({ paused: true })
  const instance = getCurrentInstance()

  const init = () => {
    const elem = unref(target)
    assert(!!elem, 'target is not a valid element')

    tweenVars && tweenVars.forEach((tweenVar) => {
      tl.to(elem, tweenVar)
    })
    tl.play()
  }

  if (instance) // run in vue component setup
    onMounted(init)
  else // run in directives
    init()

  tryOnScopeDispose(() => tl.kill())

  return tl
}

const gsapTimelineRecord = shallowReactive<Record<string, GSAPTimeline>>({})

export const useGsapInstance = (modifier: string) => {
  return computed(() => gsapTimelineRecord[modifier])
}

const TL_INSTANCE_KEY = Symbol('tl-instance')

export const defineGsapTimelineDirective = (): Directive<HTMLElement | SVGElement, any> => {
  const register = (
    el: HTMLElement | SVGElement,
    binding: DirectiveBinding,
  ) => {
    const key = Object.keys(binding.modifiers).join(MODIFILER_JOINER)
    if (key && gsapTimelineRecord[key]) gsapTimelineRecord[key].kill()

    let tweenVars: GSAPTweenVars[] = []
    if (typeof binding.value === 'object') tweenVars = binding.value
    const tl = useGsapTimeline(el, tweenVars)
    // @ts-ignore
    el[TL_INSTANCE_KEY] = tl
    if (key) __set(gsapTimelineRecord, key, tl)
  }

  const unregister = (el: HTMLElement | SVGElement, binding: DirectiveBinding) => {
    const key = Object.keys(binding.modifiers).join(MODIFILER_JOINER)
    // @ts-ignore
    if (el[TL_INSTANCE_KEY]) el[TL_INSTANCE_KEY].kill()
    if (key) __del(gsapTimelineRecord, key)
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
