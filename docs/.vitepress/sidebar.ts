import { DefaultTheme } from "vitepress";

export default <DefaultTheme.Sidebar>[
  {
    text: '指引',
    items: [
      { text: '入手指南', link: '/guide' },
    ]
  },
  {
    text: 'Tools',
    items: [
      { text: 'pinia-auto-refs', link: '/tools/pinia-auto-refs' },
    ]
  },
]