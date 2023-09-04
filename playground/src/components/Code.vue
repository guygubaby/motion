<script lang="ts" setup>
import Prism from 'prismjs'
import { onMounted } from 'vue'

interface Props {
  code: string
  lang: string
}

const props = defineProps<Props>()

const init = () => {
  Prism.highlightAll()
}

onMounted(init)
</script>

<template>
  <span style="text-transform: capitalize;">{{ lang }}</span>
  <pre>
    <code :class="`language-${props.lang}`">{{ code }}</code>
  </pre>
</template>
