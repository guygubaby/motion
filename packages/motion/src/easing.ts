import * as easingFunc from 'svelte/easing'

type PresetNames =
  |'backIn'
  |'backInOut'
  |'backOut'
  |'bounceIn'
  |'bounceInOut'
  |'bounceOut'
  |'circIn'
  |'circInOut'
  |'circOut'
  |'cubicIn'
  |'cubicInOut'
  |'cubicOut'
  |'elasticIn'
  |'elasticInOut'
  |'elasticOut'
  |'expoIn'
  |'expoInOut'
  |'expoOut'
  |'linear'
  |'quadIn'
  |'quadInOut'
  |'quadOut'
  |'quartIn'
  |'quartInOut'
  |'quartOut'
  |'quintIn'
  |'quintInOut'
  |'quintOut'
  |'sineIn'
  |'sineInOut'
  |'sineOut'

type EasingFn = (t: number) => number

export const EasingPresets: Record<PresetNames, EasingFn> = easingFunc
