<template>
  <label>
    <span>
      <input
        v-if="insideGroup"
        type="checkbox"
        :disabled="disabled"
        :value="label"
        v-model="model"
        @change="change"
      >
      <input
        v-else
        type="checkbox"
        :disabled="disabled"
        :checked="currentValue"
        @change="change"
      >
    </span>
    <slot></slot>
  </label>
</template>

<script lang="ts" setup name="ICheckbox">
import { inject, onMounted, reactive, ref, watch } from 'vue'
import { useFindComponentUpward } from '../../hooks'

const insideGroup =  ref(false)
const formItemContext: any = inject('i-form-item-context', undefined)
const checkboxGroupContext: any = inject('i-checkbox-group-context', undefined)
const emit = defineEmits(['update:modelValue', 'on-change'])

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: false
  },
  trueValue: {
    type: [String, Number, Boolean],
    default: true
  },
  falseValue: {
    type: [String, Number, Boolean],
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  label: {
    type: [String, Number, Boolean]
  }
})

watch(() => props.modelValue, (val) => {
  if (val === props.trueValue || val === props.falseValue) {
    updateChecked()
  } else {
    throw 'Value should be trueValue or falseValue.';
  }
})

const currentValue = ref<any>(props.modelValue)
const updateChecked = () => {
  currentValue.value = props.modelValue === props.trueValue
}

const change = (event: any) => {
  if (props.disabled) {
    return false
  }

  const checked = event.target.checked
  currentValue.value = checked

  const value = checked ? props.trueValue : props.falseValue
  emit('update:modelValue', value)

  if (insideGroup.value) {
    checkboxGroupContext.change(model.value)
  } else {
    emit('on-change', value)
    formItemContext?.validate('change')
  }
}

const model = ref<any>(null)
const updateModel = (val: any) => {
  model.value = val || []
}
const updateCurrentValueByGroup = () => {
  currentValue.value = model.value.includes(props.label)
  insideGroup.value = true
}

const getModel = () => model.value
const context = reactive({
  getModel,
  updateModel,
  updateCurrentValueByGroup
})

const checkboxParent = useFindComponentUpward('ICheckboxGroup')
onMounted(() => {
  if (checkboxParent) {
    insideGroup.value = true
  }

  if (insideGroup.value) {
    checkboxGroupContext?.addField(context)
    checkboxGroupContext?.updateModel(true)
  } else {
    updateChecked()
  }
})
</script>
