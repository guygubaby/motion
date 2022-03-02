import type { Options } from 'tsup'

const options: Options = {
  splitting: false,
  sourcemap: false,
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
  entryPoints: [
    './src/index.ts',
    './src/tweened.ts',
  ],
  outDir: 'dist',
  external: ['vue'],
}

export default options
