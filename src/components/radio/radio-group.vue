<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup name="IRadioGroup">
import { inject, onMounted, provide, reactive, ref, watch } from 'vue'
import { uuid } from '../../utils'
const emit = defineEmits(['update:modelValue', 'on-change'])
const formItemContext: any = inject('i-form-item-context', undefined)

const props = defineProps({
  modelValue: {
    type: [Number, String, Boolean],
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

watch(() => props.modelValue, () => {
  updateRadioChecked()
})

watch(() => props.disabled, () => {
  initRadioDisabled()
})

const children = ref<any>([])
const addField = (child) => {
  children.value.push(child)
}

const initRadiosName = () => {
  const id = uuid(5)
  if (children.value.length) {
    children.value.forEach(child => {
      child.setRadioName(id)
    })
  }
}

const updateRadioChecked = () => {
  if (children.value.length) {
    children.value.forEach(child => {
      child.updateChecked(props.modelValue)
    })
  }
}

const initRadioDisabled = () => {
  if (children.value.length) {
    children.value.forEach(child => {
      child.updateDisabled(props.disabled)
    })
  }
}

onMounted(() => {
  initRadiosName()
  updateRadioChecked()

  if (props.disabled) {
    initRadioDisabled()
  }
})

const change = (value) => {
  emit('update:modelValue', value)
  emit('on-change', value)
  formItemContext?.validate('change')
}

const context = reactive({
  addField,
  change
})

provide('i-radio-group-context', context)

</script>

<style lang="scss" scoped>
</style>