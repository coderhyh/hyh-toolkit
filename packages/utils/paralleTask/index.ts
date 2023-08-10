/**
 * @description: 并行执行多个任务, 并按照它们被触发的顺序返回结果
 * @param {Array<() => Promise<T>>} tasks 返回 Promise 的函数数组
 * @param {(result: PromiseSettledResult<T>) => void} cb 传入一个回调函数, 在每个确定的 Promise 结果时调用
 * @param {number} paralleCount 最大并行执行任务数 default: 3
 * @return {Promise<PromiseSettledResult<T>[]>} 返回一个 Promise, 解析为一组已完成的 Promise 结果数组
 */
export function paralleTask<T = any>(
  tasks: (() => Promise<T>)[],
  cb?: (result: PromiseSettledResult<T>) => void,
  paralleCount = 3
): Promise<PromiseSettledResult<T>[]> {
  return new Promise((resolve) => {
    const tasksLength = tasks.length
    if (!tasksLength) return resolve([])
    const result: PromiseSettledResult<T>[] = []
    let nextIndex = 0
    let finishCount = 0
    const _run = () => {
      const task = tasks[nextIndex++]
      task()
        .then((res) => {
          result.push({ status: 'fulfilled', value: res })
        })
        .catch((err) => {
          result.push({ status: 'rejected', reason: err })
        })
        .finally(() => {
          cb?.(result.at(-1)!)
          finishCount++
          if (nextIndex < tasksLength) _run()
          else if (finishCount === tasksLength) resolve(result)
        })
    }

    for (let i = 0; i < paralleCount && i < tasksLength; i++) {
      _run()
    }
  })
}
