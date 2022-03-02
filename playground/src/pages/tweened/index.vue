<template>
  <div class="flex flex-col">
    <progress class="w-full" :value="progress" />

    <div class="flex mt-5vh justify-center">
      <button @click="set(0)">
        0%
      </button>

      <button class="mx-2" @click="set(0.5)">
        50%
      </button>

      <button @click="set(1)">
        100%
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EasingPresets, useTweened } from 'motion'

const progress = useTweened(0, {
  easing: EasingPresets.circOut,
})

const set = (value: number) => {
  progress.value = value
}
</script>
