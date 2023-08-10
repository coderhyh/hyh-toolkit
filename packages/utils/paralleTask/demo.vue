<template>
  <div>
    <section class="flex flex-items-center">
      <label class="w300px h50px mr20px flex flex-items-center">
        <p class="w-20">任务数:</p>
        <el-input v-model="taskCount" autofocus />
      </label>
      <label class="w300px h50px mr20px flex flex-items-center">
        <p class="w-20">并发数:</p>
        <el-input v-model="paralleCount" />
      </label>
      <el-button @click="handleStart">开始</el-button>
    </section>
    <ul class="m0! max-h300px overflow-y-auto">
      <li v-for="it in result" :key="it">{{ it }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { paralleTask } from 'hyh-toolkit'

const result = ref<string[]>([])
const taskCount = ref(10)
const paralleCount = ref(3)

const createTasks = () =>
  Array.from(
    { length: taskCount.value },
    (_, i) => () =>
      new Promise<string>((resolve, reject) => {
        const flag = Math.random() > 0.5
        const time = Math.floor(Math.random() * 3000 + 1000)
        const message = `第${i + 1}个任务执行${flag ? '成功' : '失败'} 耗时: ${time}ms`
        setTimeout(() => (flag ? resolve : reject)(message), time)
      })
  )

const handleStart = async () => {
  result.value = []
  const tasks = createTasks()
  await paralleTask(
    tasks,
    (res) => {
      result.value.push(res.status === 'fulfilled' ? res.value : res.reason)
    },
    paralleCount.value
  )
  result.value.push('所有任务执行完毕')
}
</script>

<style scoped></style>
