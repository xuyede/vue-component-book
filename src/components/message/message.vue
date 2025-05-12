<template>
  <div class="alert">
    <div class="alert-main" v-for="item in notices" :key="item.name">
      <div class="alert-content">{{ item.content }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup name="IMessage">
import { ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    default: ''
  }
})

let seed = 0

const getUuid = () => {
  return 'alert_' + seed++
}

const notices = ref<{
  content: string,
  duration?: number,
  name: string,
}[]>([])

const add = (notice: any) => {
  const name = getUuid()

  const _notice = Object.assign({
    name
  }, notice)

  notices.value.push(_notice)

  const duration = notice.duration
  setTimeout(() => {
    remove(name)
  }, duration * 1000)
}

const remove = (name: string) => {
  for (let i = 0; i < notices.value.length; i++) {
    if (notices.value[i].name === name) {
      notices.value.splice(i, 1)
      removeEl()
      break
    }
  }
}

const removeEl = () => {
  const $target = document.getElementById(props.id)

  if ($target) {
    $target.parentNode?.removeChild($target)
  }
}

defineExpose({add, remove})
</script>

<style lang="scss" scoped>
 .alert {
    position: fixed;
    width: 100%;
    top: 16px;
    left: 0;
    text-align: center;
    pointer-events: none;
  }
  .alert-content {
    display: inline-block;
    padding: 8px 16px;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
    margin-bottom: 8px;
  }
</style>