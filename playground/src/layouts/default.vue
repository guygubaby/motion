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

const srouceUrl = computed(() => `${prefix}${routeItem.path}/index.vue`)
</script>
