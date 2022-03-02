<template>
  <div class="p-4">
    <router-link to="/">
      Back Home
    </router-link>

    <router-view v-slot="{ Component, route }">
      <h3 style="text-transform: capitalize;">
        {{ route.name }}
      </h3>

      <component :is="Component" :key="route" />

      <hr>
      <div>
        <a target="_blank" :href="srouceUrl">Source</a>
      </div>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const prefix = 'https://github.com/guygubaby/motion/blob/main/playground/src/pages'

const routeItem = useRoute()

const getMatchFile = () => {
  // @ts-ignore
  const item = routeItem.matched[routeItem.matched.length - 1]?.components?.default?.__file as string
  if (!item) return prefix
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, file] = item.split('src/pages')
  return prefix + file
}

const srouceUrl = computed(() => getMatchFile())
</script>
