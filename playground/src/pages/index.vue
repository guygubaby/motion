<script lang="ts" setup>
interface IModuleItem {
  label: string
  route: string
}

const reg = /\.\/(\w+)\/.*$/gmi
const modules = import.meta.globEager('./**/*.vue')

const moduleList: IModuleItem[] = Object.keys(modules).map((key) => {
  reg.lastIndex = 0
  const name = reg.exec(key)?.[1] || key
  return {
    label: name,
    route: `/${name}`,
  }
}).sort((p, n) => p.label.localeCompare(n.label))
</script>

<template>
  <ul>
    <li v-for="item in moduleList" :key="item.route">
      <router-link :to="item.route">
        <span style="text-transform:capitalize">{{ item.label }}</span>
      </router-link>
    </li>
  </ul>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
