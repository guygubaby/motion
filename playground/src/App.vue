<template>
  <div class="font-sans">
    <progress :value="progress" />

    <br>

    <button @click="set(0)">
      0%
    </button>

    <button @click="set(0.5)">
      50%
    </button>

    <button @click="set(1)">
      100%
    </button>
  </div>
</template>

<script lang="ts" setup>
import { cubicOut, useTweened } from 'motion'
import { ref } from 'vue'

const source = ref(0)

const progress = useTweened(source, {
  easing: cubicOut,
})

const set = (value: number) => {
  source.value = value
}
</script>
