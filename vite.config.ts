/// <reference types="vitest" />

import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true,
  },
  // css: {
  //   modules: {
  //     localsConvention: 'camelCaseOnly',
  //     generateScopedName: (name: string) => `rbac-${name}`
  //   }
  // }
})
