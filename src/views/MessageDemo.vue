<template>
  <div>
    <button @click="handleMessage('deye')">deye</button>
    <button @click="handleMessage('yede')">yede</button>
  </div>
</template>

<script lang="ts" setup name="MessageDemo">
import { ref, getCurrentInstance } from 'vue'

const instance = getCurrentInstance()?.proxy

const handleMessage = (message) => {
  instance.$message(message)
}

</script>

<style lang="scss" scoped>
$primary-color: var(--el-color-primary);
$text-color: var(--el-text-color-primary);
</style>