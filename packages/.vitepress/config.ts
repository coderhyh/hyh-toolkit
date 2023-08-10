import { defineConfig } from 'vitepress'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
import { resolve } from 'path'

import nav from './nav'
import sidebar from './sidebar'

export default defineConfig({
  title: ' ',
  description: 'hyh-toolkit 是一个多功能工具库，集成了 Vite Plugin、Vue Hook、实用工具等，为开发提供便利。',
  base: '/hyh-toolkit/',
  lastUpdated: true,
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: './vue-icon.svg',
      },
    ],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,height=device-height, maximum-scale=1.0,minimum-scale=1.0',
      },
    ],
  ],
  themeConfig: {
    logo: '/logo.svg',
    nav,
    sidebar,
    socialLinks: [{ icon: 'github', link: 'https://github.com/coderhyh/hyh-toolkit' }],
    search: {
      provider: 'local'
    },
  },
  markdown: {
    lineNumbers: true,
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    }
  },
  vite: {
    resolve: { alias: { 'hyh-toolkit': resolve(__dirname, '../') } },
    plugins: [
      AutoImport({
        dts: '../auto-imports.d.ts',
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        dts: '../components.d.ts',
        resolvers: [ElementPlusResolver()],
      }),
      Unocss()
    ]
  }
})
