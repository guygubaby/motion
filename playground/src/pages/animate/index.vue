<script lang="ts" setup>
import { defineDirective, defineVariants, useMotion, useMotionInstance } from '@bryce-loskie/motion'
import { ref } from 'vue'

const variants = defineVariants({
  initial: {
    x: 50,
    opacity: 0,
  },
  enter: {
    x: 550,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 900,
    },
  },
  leave: {
    x: 50,
    opacity: 1,
  },
})

// 1. directive usage
const vMotion = defineDirective()

// 2. directive with custom name and get controller
const fooInstance = useMotionInstance('foo')
const applyVariant = async () => {
  await fooInstance.value.apply('leave')
}

// 3. template ref usage
const fooRef = ref()
useMotion(fooRef, variants)
</script>

<template>
  <div class="w-full h-440px border border-warm-gray-300 rounded-xl shadow shadow-gray-100">
    <svg class="w-full h-full">
      <rect v-motion="variants" class="cursor-pointer" y="50" width="100" height="100" rx="15" fill="gray" />
      <rect ref="fooRef" class="cursor-pointer" y="160" width="100" height="100" rx="15" fill="gray" />
      <rect v-motion.foo="variants" class="cursor-pointer" y="270" width="100" height="100" rx="15" fill="gray" />
    </svg>
  </div>

  <button @click="applyVariant">
    manual applyVariant
  </button>
</template>
