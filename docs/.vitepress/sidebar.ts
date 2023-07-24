import { DefaultTheme } from "vitepress";

export default <DefaultTheme.Sidebar>[
  {
    text: '指引',
    items: [
      { text: '入手指南', link: '/guide' },
    ]
  },
  {
    text: 'Vue Hooks',
    items: [
      { text: 'useVModel', link: '/vue-hooks/useVModel' },
    ]
  },
  {
    text: 'Vite Plugin',
    items: [
      { text: 'pinia-auto-refs', link: '/vite-plugin/pinia-auto-refs' },
    ]
  },
]