import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./packages/index.ts', './packages/vite.ts'],
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
  // onSuccess: 'npm run build:fix',
})
