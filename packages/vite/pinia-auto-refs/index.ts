import fs from 'fs'
import path from 'path'
import chokidar from 'chokidar'
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
  pathAlias: '~',
}

export function PiniaAutoRefs(options: Options = {}) {
  options = { ...defaultOptions, ...options }

  const { storeDir, excludes, outputFile, pathAlias } = options as Required<Options>
  const storePath = path.resolve(process.cwd(), storeDir)
  const outputDir = outputFile.replace(/(\/[^/]*).ts/, '')
  fs.promises.readdir(outputDir).catch(() => fs.promises.mkdir(outputDir))

  async function generateConfigFiles() {
    const storesPath = await fs.promises.readdir(storePath)
    const storeNames = storesPath
      .filter(i => i.endsWith('.ts'))
      .map(i => i.replace('.ts', ''))
      .filter(i => !excludes.includes(i))

    const toHump = (s: string) => s.replace(/[-_]([A-z\d])/g, (_, $1) => $1.toUpperCase())
    const importT = storeNames
      .map(storeName => `import ${toHump(storeName)}Store from '${storeDir.replace('src', pathAlias)}/${storeName}'`)
      .join('\n')
    const exportT = storeNames
      .map(
        (storeName, i) => `  ${toHump(storeName)}: ${toHump(storeName)}Store${i === storeNames.length - 1 ? '' : ','}`,
      )
      .join('\n')
    const ctx = `import type { ToRef } from 'vue'

${importT}

type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never

type AutoToRefs<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : K extends \`$\${infer P}\` ? P : ToRef<T[K]>
}
type PartialRef<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : K extends \`$\${infer P}\` ? P : ToRef<T[K]['value'] | undefined>
}

const storeExports = {
${exportT}
}

export function useStore<T extends keyof typeof storeExports>(storeName: T) {
  const store = storeExports[storeName]()
  const storeRefs = storeToRefs(store)
  return { ...store, ...storeRefs } as (
    T extends any ? (x: AutoToRefs<ReturnType<typeof storeExports[T]>>) => void : never
  ) extends (x: infer R) => void
    ? IsUnion<T> extends true
      ? R extends Record<string, any>
        ? PartialRef<R>
        : never
      : R
    : never
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
    apply: 'serve',
    configResolved(config: ResolvedConfig) {
      generateConfigFiles()
      setupWatcher(chokidar.watch(defaultOptions.storeDir!))
    },
  }
}
