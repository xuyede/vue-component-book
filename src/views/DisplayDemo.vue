<template>
  <h3>动态渲染 .vue 文件的组件—— Display</h3>

  <i-display :code="code"></i-display>
</template>

<script lang="ts" setup>
import IDisplay from '../components/display/display.vue'
import defaultCode from './default'

const code = defaultCode
</script>

<style lang="scss" scoped>
$primary-color: var(--el-color-primary);
$text-color: var(--el-text-color-primary);
</style>