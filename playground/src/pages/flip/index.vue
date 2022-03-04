<template>
  <div class="h-50vh flex justify-center items-center">
    <div class="flex flex-col">
      <img ref="sRef" class="thumbnail w-200px h-200px" data-flip-id="img" src="https://placehold.co/200x200" @click="toogle">

      <div class="container" @click="toogle">
        <img ref="eRef" class="full-size" data-flip-id="img" src="https://placehold.co/600x600">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { Draggable } from 'gsap/Draggable'
import { onMounted, ref } from 'vue'

gsap.registerPlugin(Flip, Draggable)

const sRef = ref()
const eRef = ref()

onMounted(() => {
  Draggable.create(sRef.value)
})

const toogle = () => {
  const state = Flip.getState([sRef.value, eRef.value])

  eRef.value.classList.toggle('active')
  sRef.value.classList.toggle('active')

  Flip.from(state, {
    duration: 0.6,
    fade: true,
    absolute: true,
    toggleClass: 'flipping',
    ease: 'power1.inOut',
  })
}

</script>

<style lang="css" scoped>
body {
  color: white;
  background-color: black;
  padding: 0;
  font-family: "Signika Negative", Arial, sans-serif;
  box-sizing: border-box;
  text-align: center;
}

h1 {
margin-left: 20px;
}

.container {
  border: 1px solid rgba(255,255,255,0.3);
  position: fixed;
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  pointer-events: none;
}

.full-size {
  flex-shrink: 0;
  flex-grow: 0;
  height: 100%;
  display: none;
}

.full-size.active {
  display: block;
}

.thumbnail.active {
  visibility: hidden;
}

.thumbnail, .thumbnail.flipping {
  visibility: visible;
}
</style>
