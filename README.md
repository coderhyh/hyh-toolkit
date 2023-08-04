<p align="center" style="margin-top: 20px">
  <a href="https://coderhyh.github.io/hyh-toolkit" target="_blank">
    <img width="350" src="https://coderhyh.github.io/hyh-toolkit/logo.svg">
  </a>
  <br/><br/>
  <a href="https://www.npmjs.com/package/hyh-toolkit" target="_blank">
    <img src="https://img.shields.io/npm/v/hyh-toolkit.svg?logo=npm" alt="npm package">
  </a>
  <a href="https://github.com/coderhyh/hyh-toolkit/blob/master/LICENSE" target="_blank">
    <img src="https://img.shields.io/github/license/coderhyh/hyh-toolkit" alt="LICENSE">
  </a>
  <a href="#" target="_blank">
    <img src="https://img.shields.io/github/languages/top/coderhyh/hyh-toolkit?logo=typescript" alt="languages">
  </a>
</p>

# hyh-toolkit

hyh-toolkit 是一个多功能工具库，集成了 Vite Plugin、Vue Hook、实用工具等，为开发提供便利。

## ✨ 特性

- 🏄🏼‍♂️ 易学易用
- 📦 内置 Vite Plugin
- 🛸 丰富的 Hooks
- 🔨 内置常用工具函数
- 🎯 使用 TypeScript 构建，提供完整的类型定义文件

## 📦 安装

```bash
npm i hyh-toolkit
```

## 🔨 使用

```ts
import { useVModel } from 'hyh-toolkit'
```

### 按需引入

```ts
import { useVModel } from 'hyh-toolkit/es/vue-hooks/useVModel'
```

### 自动引入

> 使用 [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import#readme) 的 resolver

#### Vite

```ts
import AutoImport from 'unplugin-auto-import/vite'
import { HyhToolkitResolvers } from 'hyh-toolkit/lib/resolvers'

export default defineConfig({
  plugins: [
    AutoImport({
      /* ... */
      resolvers: [HyhToolkitResolvers()]
    })
  ]
})
```

#### Webpack

```js
const { defineConfig } = require('@vue/cli-service')
const { HyhToolkitResolvers } = require('hyh-toolkit/lib/resolvers')
const AutoImport = require('unplugin-auto-import/webpack')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      AutoImport({
        /* ... */
        resolvers: [HyhToolkitResolvers()]
      })
    ]
  }
})
```

其他支持的工具, 更多请看 [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import#readme)

## 🧩 兼容

暂不支持 vue2
