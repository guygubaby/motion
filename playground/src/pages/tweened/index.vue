<template>
  <div class="flex flex-col">
    <progress class="w-full" :value="progress" />

    <div class="flex gap-2 mt-5vh justify-center">
      <button @click="minus">
        -
      </button>

      <button @click="progress = 0">
        0%
      </button>

      <button @click="progress = 0.5">
        50%
      </button>

      <button @click="progress = 1">
        100%
      </button>

      <button @click="plus">
        +
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EasingPresets, useTweened } from '@bryce-loskie/motion'

const progress = useTweened(0, {
  easing: EasingPresets.circOut,
})

const minus = () => {
  progress.value = Math.max ((progress.value - 0.1), 0)
}

const plus = () => {
  progress.value = Math.min ((progress.value + 0.1), 1)
}
</script>
