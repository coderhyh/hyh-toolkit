---
title: paralleTask
titleTemplate: 并行执行多个任务，并按照它们被触发的顺序返回结果。
---

# paralleTask

并行执行多个任务，并按照它们被触发的顺序返回结果。

## 使用场景

假设你有一组需要并行执行的异步任务，例如网络请求、文件读取、数据库查询等，你想要控制同时执行的任务数量，并且希望按照任务触发的顺序返回任务的执行结果。

使用 paralleTask 函数可以实现这样的效果。它允许你传入一个由返回 Promise 的函数组成的数组 tasks，并指定同时执行的最大任务数 paralleCount。

## 示例

<preview path="./demo.vue"></preview>

## API

```ts
const result = await paralleTask(tasks, callBack, paralleCount)
```

## Params

| 参数           | 说明                                              | 类型                                        | 默认值      |
| -------------- | ------------------------------------------------- | ------------------------------------------- | ----------- |
| `tasks`        | 返回 Promise 的函数数组                           | `(() => Promise<T>)[]`                      | 必传        |
| `callBack`     | 传入一个回调函数，在每个确定的 Promise 结果时调用 | `(result: PromiseSettledResult<T>) => void` | `undefined` |
| `paralleCount` | 最大并行执行任务数                                | `number`                                    | `3`         |

## Result

| 参数     | 说明                                                  | 类型                                 |
| -------- | ----------------------------------------------------- | ------------------------------------ |
| `result` | 返回一个 Promise, 解析为一组已完成的 Promise 结果数组 | `Promise<PromiseSettledResult<T>[]>` |
