<template>
  <div class="flex flex-col">
    <svg
      ref="svgRef"
      class="w-full h-50vh border border-solid border-gray-200 rounded-2xl"
      @mousedown="() => size = 30"
      @mouseup="() => size = 10"
      @mousemove="handleMouseMove"
    >
      <circle fill="#ff3e00" :cx="coords.x" :cy="coords.y" :r="size" /></svg>
  </div>
</template>

<script lang="ts" setup>
import { useSpring } from '@bryce-loskie/motion'
import { ref } from 'vue'

const svgRef = ref<Nullable<HTMLElement>>(null)

const coords = useSpring({ x: 50, y: 50 }, {
  stiffness: 0.1,
  damping: 0.25,
})

const handleMouseMove = (e: MouseEvent) => {
  const { top, left } = svgRef.value!.getBoundingClientRect()
  coords.value = {
    x: e.clientX - left,
    y: e.clientY - top,
  }
}

const size = useSpring(10)
</script>
