import { describe, expect, it } from 'vitest'

import { paralleTask } from './index'

describe('paralleTask', () => {
  it('should return an empty array if tasks array is empty', async () => {
    const tasks: (() => Promise<any>)[] = []
    const result = await paralleTask(tasks)
    expect(result).toEqual([])
  })

  it('should execute tasks in parallel and return the results in the order they were triggered', async () => {
    const tasks: (() => Promise<number>)[] = [
      () => new Promise((resolve) => setTimeout(() => resolve(1), 1000)),
      () => new Promise((resolve) => setTimeout(() => resolve(2), 500)),
      () => new Promise((resolve) => setTimeout(() => resolve(3), 2000))
    ]
    const result = await paralleTask(tasks)
    expect(result).toEqual([
      { status: 'fulfilled', value: 2 },
      { status: 'fulfilled', value: 1 },
      { status: 'fulfilled', value: 3 }
    ])
  })

  it('should limit the number of parallel tasks to the specified parallelCount', async () => {
    const tasks: (() => Promise<number>)[] = [
      () => new Promise((resolve) => setTimeout(() => resolve(1), 1000)),
      () => new Promise((resolve) => setTimeout(() => resolve(2), 500)),
      () => new Promise((resolve) => setTimeout(() => resolve(3), 2000)),
      () => new Promise((resolve) => setTimeout(() => resolve(4), 300)),
      () => new Promise((resolve) => setTimeout(() => resolve(5), 800))
    ]
    const result = await paralleTask(tasks, undefined, 2)
    expect(result).toEqual([
      { status: 'fulfilled', value: 2 },
      { status: 'fulfilled', value: 1 },
      { status: 'fulfilled', value: 4 },
      { status: 'fulfilled', value: 5 },
      { status: 'fulfilled', value: 3 }
    ])
  })

  it('should handle rejected promises and include the reason in the result', async () => {
    const tasks: (() => Promise<number>)[] = [
      () => new Promise((resolve) => setTimeout(() => resolve(1), 1000)),
      () => new Promise((_, reject) => setTimeout(() => reject('Error 1'), 500)),
      () => new Promise((resolve) => setTimeout(() => resolve(3), 2000)),
      () => new Promise((_, reject) => setTimeout(() => reject('Error 2'), 300)),
      () => new Promise((resolve) => setTimeout(() => resolve(5), 800))
    ]
    const result = await paralleTask(tasks)
    expect(result).toEqual([
      { status: 'rejected', reason: 'Error 1' },
      { status: 'rejected', reason: 'Error 2' },
      { status: 'fulfilled', value: 1 },
      { status: 'fulfilled', value: 5 },
      { status: 'fulfilled', value: 3 }
    ])
  })
})
