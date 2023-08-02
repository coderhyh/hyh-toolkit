import path from 'path'
import { defineConfig } from 'vite'
import { buildPlugin } from 'vite-plugin-build'

export default defineConfig({
  plugins: [
    buildPlugin({
      fileBuild: {
        emitDeclaration: true,
        inputFolder: 'packages',
        ignoreInputs: ['**/*.spec.*', '**/*.test.*', '**/*.d.ts', '**/*.vue', '**/*.md']
      },
      libBuild: {
        buildOptions: [
          {
            rollupOptions: {
              external: ['vue'],
              output: { globals: { vue: 'vue' } }
            },
            lib: {
              formats: ['es', 'cjs', 'iife'],
              entry: path.resolve(__dirname, 'packages/vue-hooks/index.ts'),
              name: 'hyh_toolkit',
              fileName: (format) => `index.${format}.js`
            }
          },
          {
            rollupOptions: {
              external: ['chokidar'],
              output: { globals: { chokidar: 'chokidar' } }
            },
            lib: {
              formats: ['es', 'cjs', 'iife'],
              entry: path.resolve(__dirname, 'packages/vite-plugin/index.ts'),
              name: 'hyh_toolkit_vite_plugin',
              fileName: (format) => `vite-plugin.${format}.js`
            }
          },
          {
            rollupOptions: {
              external: ['vue'],
              output: { globals: { vue: 'vue' } }
            },
            lib: {
              formats: ['es', 'cjs', 'iife'],
              entry: path.resolve(__dirname, 'packages/resolvers.ts'),
              name: 'hyh_toolkit_resolvers',
              fileName: (format) => `resolvers.${format}.js`
            }
          }
        ]
      }
    })
  ]

  // css: {
  //   modules: {
  //     localsConvention: 'camelCaseOnly',
  //     generateScopedName: (name: string) => `rbac-${name}`
  //   }
  // }
})
