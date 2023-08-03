---
title: hyh-toolkit入手指南
titleTemplate: hyh-toolkit 是一个多功能工具库，集成了 Vite Plugin、Vue Hook、实用工具等，为开发提供便利。
---

<div style="display: flex">
  <h1>hyh-toolkit</h1>
  <a href="https://www.npmjs.com/package/hyh-toolkit" target="_blank" style="margin-left: 10px">
    <img src="https://img.shields.io/npm/v/hyh-toolkit.svg" alt="npm package">
  </a>
</div>

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

### 引入

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

::: warning
暂不支持 vue2
:::
