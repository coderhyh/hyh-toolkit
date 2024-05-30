import type { Rule } from 'unocss'
import { defineConfig, presetAttributify, presetUno } from 'unocss'
// https://github.com/unocss/unocss

const sizeMapping: Record<string, string> = {
  h: 'height',
  w: 'width',
  m: 'margin',
  p: 'padding',
  mt: 'margin-top',
  mr: 'margin-right',
  mb: 'margin-bottom',
  ml: 'margin-left',
  pt: 'padding-top',
  pr: 'padding-right',
  pb: 'padding-bottom',
  pl: 'padding-left',
  fs: 'font-size',
  br: 'border-radius',
}

function getSizeRules(Mapping: Record<string, string>): Rule<{}>[] {
  return Object.keys(Mapping).map((key) => {
    const value = Mapping[key]
    return [new RegExp(`^${key}(\\d+)$`), ([, d]) => ({ [value]: `${d}px` })]
  })
}

export function createConfig() {
  return defineConfig({
    presets: [presetUno(), presetAttributify()],
    content: {
      pipeline: {
        include: [/\.vue$/],
      },
    },
    rules: getSizeRules(sizeMapping),
  })
}

export default createConfig()
