import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { presetUno } from 'unocss'
import Unocss from 'unocss/vite'

export default defineConfig({
  resolve: {
    alias: {
      '@/*': `${resolve(__dirname, 'src')}/*`,
      'motion': resolve(__dirname, '../packages/motion/index.ts'),
    },
  },
  plugins: [
    Vue(),
    Unocss({
      presets: [presetUno()],
    }),
  ],
  optimizeDeps: {},
})
