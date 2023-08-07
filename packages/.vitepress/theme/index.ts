// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import { AntDesignContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component('demo-preview', AntDesignContainer)
  }
}
