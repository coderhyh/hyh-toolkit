import { defineConfig } from 'vitepress'
import { pagefindPlugin } from 'vitepress-plugin-pagefind'

import nav from './nav'
import sidebar from './sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: ' ',
  description: 'tools',
  base: '/hyh-toolkit/',
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,
    socialLinks: [{ icon: 'github', link: 'https://github.com/coderhyh/hyh-toolkit' }]
  },
  markdown: {
    lineNumbers: true
  },
  vite: {
    plugins: [
      pagefindPlugin({
        resultOptimization: false,
        filter(searchItem) {
          return !searchItem.route.includes('404')
        },
        customSearchQuery(input) {
          return input
            .replace(/[\u4e00-\u9fa5]/g, ' $& ')
            .replace(/\s+/g, ' ')
            .trim()
        }
      })
    ]
  }
})
