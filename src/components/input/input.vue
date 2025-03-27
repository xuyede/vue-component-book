<template>
  <input type="text"
    :value="modelValue"
    @input="handleInput"
    @blur="handleBlur"
  >
</template>

<script setup name="iInput">
import { ref, inject } from 'vue'
const formItemContext = inject('i-form-item-context', undefined)

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const currentValue = ref(props.value)

const handleInput = (event) => {
  const value =  event.target.value
  currentValue.value = value
  emit('update:modelValue', value)
  formItemContext?.validate('change')
}

const handleBlur = () => {
  formItemContext?.validate('blur')
}
</script>
