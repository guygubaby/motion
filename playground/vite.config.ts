import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { presetUno } from 'unocss'
import Unocss from 'unocss/vite'
import Pages from 'vite-plugin-pages'

export default defineConfig({
  resolve: {
    alias: {
      '@/*': `${resolve(__dirname, 'src')}/*`,
      'motion': resolve(__dirname, '../packages/motion/src/index.ts'),
    },
  },
  plugins: [
    Pages(),
    Vue(),
    Unocss({
      presets: [presetUno()],
    }),
  ],
  optimizeDeps: {},
})
