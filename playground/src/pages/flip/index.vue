<template>
  <div class="h-50vh flex justify-center items-center">
    <div class="flex flex-col">
      <img ref="sRef" class="thumbnail" data-flip-id="img" src="https://placehold.co/100x100" @click="toogle">

      <div v-if="isShow" class="inset-0 z-999 bg-gray-100 fixed flex justify-center items-center" @click="toogle">
        <img ref="eRef" data-flip-id="img" src="https://placehold.co/300x300">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { Draggable } from 'gsap/Draggable'
import { nextTick, onMounted, ref } from 'vue'

gsap.registerPlugin(Flip, Draggable)

const sRef = ref()
const eRef = ref()

const isShow = ref(false)

onMounted(() => {
  Draggable.create(sRef.value)
})

const loadImg = (url: string) => {
  return new Promise<void>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = url
  })
}

const show = async() => {
  isShow.value = true
  await nextTick()
  await loadImg(eRef.value.src)

  const state = Flip.getState([sRef.value, eRef.value])
  Flip.from(state, {
    fade: true,
    duration: 0.9,
    absolute: true,
    ease: 'power1.inOut',
    toggleClass: 'flipping',
  })
}

const hide = () => {
  const state = Flip.getState([sRef.value, eRef.value])
  Flip.to(state, {
    fade: true,
    duration: 0.9,
    absolute: true,
    ease: 'power1.inOut',
    toggleClass: 'flipping',
    onComplete: () => {
      isShow.value = false
    },
  })
}

const toogle = async() => {
  sRef.value.classList.toggle('active')

  if (isShow.value)
    hide()

  else
    await show()
}

</script>

<style lang="css" scoped>

.thumbnail.active {
  visibility: hidden;
}

.thumbnail, .thumbnail.flipping {
  visibility: visible;
}
</style>
