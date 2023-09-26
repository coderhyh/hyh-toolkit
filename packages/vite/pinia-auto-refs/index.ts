import chokidar from 'chokidar'
import fs from 'fs'
import path from 'path'
import type { ResolvedConfig } from 'vite'

type Options = Partial<{
  storeDir: string
  excludes: string[]
  outputFile: string
  pathAlias: string
}>

const defaultOptions: Options = {
  storeDir: 'src/store/src',
  excludes: ['index'],
  outputFile: 'src/hooks/useStore.ts',
  pathAlias: '~'
}

export const PiniaAutoRefs = (options: Options = {}) => {
  options = { ...defaultOptions, ...options }

  const { storeDir, excludes, outputFile, pathAlias } = options as Required<Options>
  const storePath = path.resolve(process.cwd(), storeDir)
  const outputDir = outputFile.replace(/(\/[^/]*).ts/, '')
  fs.promises.readdir(outputDir).catch(() => fs.promises.mkdir(outputDir))

  async function generateConfigFiles() {
    const storesPath = await fs.promises.readdir(storePath)
    const storeNames = storesPath
      .filter((i) => i.endsWith('.ts'))
      .map((i) => i.replace('.ts', ''))
      .filter((i) => !excludes.includes(i))

    const toHump = (s: string) => s.replace(/[-_]([A-z\d])/g, (_, $1) => $1.toUpperCase())
    const importT = storeNames
      .map((storeName) => `import ${toHump(storeName)}Store from '${storeDir.replace('src', pathAlias)}/${storeName}'`)
      .join('\n')
    const exportT = storeNames
      .map(
        (storeName, i) => `  ${toHump(storeName)}: ${toHump(storeName)}Store${i === storeNames.length - 1 ? '' : ','}`
      )
      .join('\n')
    const ctx = `import type { ToRef } from 'vue'

${importT}

type AutoToRefs<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] : ToRef<T[K]>
}

const storeExports = {
${exportT}
}

export function useStore<T extends keyof typeof storeExports>(storeName: T) {
  const store = storeExports[storeName]()
  const storeRefs = storeToRefs(store)
  return { ...store, ...storeRefs } as unknown as AutoToRefs<ReturnType<(typeof storeExports)[T]>>
}
`
    fs.promises.writeFile(outputFile, ctx, 'utf-8')
  }

  const setupWatcher = (watcher: fs.FSWatcher) => {
    watcher.on('unlink', generateConfigFiles)
    watcher.on('add', generateConfigFiles)
  }

  return {
    name: 'pinia-auto-refs',
    configResolved(config: ResolvedConfig) {
      if (config.env.PROD) return
      generateConfigFiles()
      setupWatcher(chokidar.watch(defaultOptions.storeDir!))
    }
  }
}
