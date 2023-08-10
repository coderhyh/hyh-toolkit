---
title: useVModel
titleTemplate: 实现多重嵌套组件数据的双向绑定
---

# useVModel

实现多重嵌套组件数据的双向绑定

## 使用场景

通常遇到以下情况是需要这样写的

但是这种写法，会带来比如 **组件嵌套层级过深，代码难以维护** 等问题

::: code-group

```vue [parent.vue]
<template>
  <son v-model="value" />
</template>

<script setup lang="ts">
const value = ref('11')
</script>
```

```vue [son.vue]
<template>
  <input :value="modelValue" @input="emit('update:modelValue', $event.target.value)" />
</template>

<script setup lang="ts">
defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()
</script>
```

:::

使用`useVModel`可以简化代码

## 使用 `useVModel`

::: code-group

```vue [parent.vue]
<template>
  <son v-model="value" />
</template>

<script setup lang="ts">
const value = ref('11')
</script>
```

```vue [son.vue]
<template>
  <input v-model="_modelValue" />
</template>

<script setup lang="ts">
import { useVModel } from 'hyh-toolkit'
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const _modelValue = useVModel(props, 'modelValue', emit)
</script>
```

:::

### 这在需要传入多个参数的组件中很有用

比如整个表单 [演武场](https://play.vuejs.org/#eNqdVMuK1EAU/ZUim/RAT4LMRkKmwUcLI6iDyqwCkuncdNdMUlVU3cQMbYMLF24EQX9BZuFSQdz4N634F96qdKfTrc6gu6r7OHXO5dyae7eUCuoKvMiLEUpVpAijRDAWGylYvV/KDIrDxMulLu+mmCYeCykfh71iupqJ5gqZAawUK1IxpRY0iUdZXiqpkc2ZhpwtWK5lyXx60e9S9qU2HIR0tnQ2SbxQQM1H91YEOoggtCkqnEhhkK0JskP7UNzVjwZzK0ekJUTMn13M/KG9p1O63rjpzgYaSv14/4XAFntWXCtn5A29lsV+margjLjRmBxcskqQxIi5iI0R+j5KWZxztHEKICoTheEkE9ROk+S1DgRgKFQZ9qrDjBsMucigCcBQaeJZzAXxIQ5oSGLOpzsMJrJUvAD9SCGnEWwxSYtCPr/vYqgrcDJdzwwm53+In5mmZXyswYCuIfG6HKZ6CitB4ycPoaFzlyR/VAVVX5F8DEYWleXYlt2uREa0e3WO7ZEbKBfTp2bcIAizFmWJumm4+sQje9y5QvqG7kFw0Jviylm/G71IT6EYseXlu+XbNxGLuVAV9qz/zB1O0qKCwNrIrQCLw7ZvC+Lr55/fXl0DQc77O8L3l5fL1x+vQSC/7iL8zz5WBk4eWNRupXqO/JcFXK+g0lIZ2r8Mci7g2N7iOdsQj/ogowFtWtsHJceubUwX2zaw61qpjCRFGwh/yOodqL2I1ZJnK8Q1Zm9eBN1JHTiOQ+ZvQVoCO3tvpQVZgIb8Ao0bBBcIOk8n0JPR+1sMajLv5nMRVXkKeueDYS+Yv/zwyX403uIXYYHkrA==)
::: code-group

```vue [parent.vue]
<template>
  <son v-model="formData" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import son from './son.vue'
import type { IFormData } from './type'
const formData = ref<IFormData>({
  name: 'hyh',
  age: 18,
  sex: '男'
})
</script>
```

```vue [son.vue]
<template>
  <label> 姓名: <input v-model="_modelValue.name" /> </label>
  <label> 年龄: <input v-model="_modelValue.age" /> </label>
  <label> 性别: <input v-model="_modelValue.sex" /> </label>
</template>

<script setup lang="ts">
import { useVModel } from 'hyh-toolkit'
import type { IFormData } from './type'

const props = defineProps<{ modelValue: IFormData }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: IFormData): void }>()

const _modelValue = useVModel(props, 'modelValue', emit)
</script>
```

```ts [type.d.ts]
export interface IFormData {
  name: string
  age: number
  sex: '男' | '女'
}
```

:::

## API

```ts
const _modelValue = useVModel(props, 'propName', emit)
```

## Params

| 参数       | 说明           | 类型                             | 默认值 |
| ---------- | -------------- | -------------------------------- | ------ |
| `props`    | 定义的`props`  | `ReturnType<typeof defineProps>` | 必传   |
| `propName` | `props`中的key | `keyof props`                    | 必传   |
| `emit`     | 定义的`emit`   | `(...args: any[]) => void`       | 必传   |

## Result

| 参数          | 说明                     | 类型                             |
| ------------- | ------------------------ | -------------------------------- |
| `_modelValue` | 处理双向绑定的`propName` | `ReturnType<typeof defineProps>` |
