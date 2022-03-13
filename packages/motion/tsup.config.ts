import type { Options } from 'tsup'

const options: Options = {
  splitting: false,
  sourcemap: false,
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
  entryPoints: [
    './src/index.ts',
    './src/spring.ts',
    './src/tweened.ts',
    './src/easing.ts',
    './src/animate.ts',
    './src/gsap.ts',
  ],
  outDir: 'dist',
  external: [
    'vue',
    'vue-demi',
    'svelte',
    'gsap',
    '@vueuse/motion',
  ],
}

export default options
