<script lang="ts" setup>
import { defineGsapTimelineDirective, defineTweenVars, useGsapInstance, useGsapTimeline } from '@bryce-loskie/motion'
import { onMounted, ref } from 'vue'

const rectRef = ref<Nullable<SVGRectElement>>(null)

const vars = defineTweenVars({
  x: 100,
  y: 100,
  duration: 1,
},
{
  x: 200,
  y: 200,
  duration: 1,
  onComplete: () => {
    console.log('complete')
  },
})

useGsapTimeline(rectRef, vars)

const vGsap = defineGsapTimelineDirective()
const tl = useGsapInstance('tl')
onMounted(() => {
  console.log(tl.value) // do more stuff with gsap timeline instance
})
</script>

<template>
  <svg class="w-200 h-50vh border border-solid border-gray-200">
    <rect ref="rectRef" x="10" y="10" class="w-10 h-10" fill="rgb(238, 242, 255)" />
    <rect v-gsap.tl="vars" x="10" y="100" class="w-10 h-10" fill="rgb(238, 242, 255)" />
  </svg>
</template>
