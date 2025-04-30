<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup name="ICheckboxGroup">
import { inject, onMounted, provide, reactive, ref, watch } from 'vue'

const formItemContext: any = inject('i-form-item-context', undefined)
const emit = defineEmits(['update:modelValue', 'on-change'])

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => ([])
  }
})

watch(() => props.modelValue, () => {
  updateModel(false)
})

const currentValue = ref(props.modelValue)
const childrens = ref<any>([])

const updateModel = (update) => {
  if (childrens.value.length) {
    childrens.value.forEach((child: any) => {
      if (update) {
        if (!child.getModel()) {
          child?.updateModel(props.modelValue)
        }
      } else {
        child?.updateModel(props.modelValue)
      }

      if (update) {
        child?.updateCurrentValueByGroup()
      }
    })
  }
}

const change = (data) => {
  currentValue.value = data
  emit('update:modelValue', data)
  emit('on-change', data)
  formItemContext?.validate('change')
}

const addField = (checkbox: any) => {
  childrens.value.push(checkbox)
}

const context = reactive({
  addField,
  change,
  updateModel
})

provide('i-checkbox-group-context', context)

onMounted(() => {
  updateModel(true)
})

</script>

<style lang="scss" scoped>

</style>