<template>
  <form>
    <slot></slot>
  </form>
</template>

<script setup name="iForm">
import { ref, provide, reactive, toRefs } from 'vue'

const props = defineProps({
  model: {
    type: Object
  },
  rules: {
    type: Object
  }
})

const fieldsList = ref([])
const addField = (field) => {
  fieldsList.value.push(field)
}

const resetFields = () => {
  fieldsList.value.forEach(field => {
    field?.resetField()
  })
}

const validate = (callback) => {
  return new Promise((resolve, reject) => {
    let valid = true
    let count = 0
    fieldsList.value.forEach(field => {
      field?.validate('', (error) => {
        if (error) {
          valid = false
        }

        if (++count === fieldsList.value.length) {
          resolve(valid)

          if (callback) {
            callback(valid)
          }
        }
      })
    })
  })
}

const context = reactive({
  ...toRefs(props),
  addField
})

provide('i-form-context', context)

defineExpose({
  resetFields,
  validate
})
</script>