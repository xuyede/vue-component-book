<template>
  <label>
    <span>
      <input
        v-if="insideGroup"
        type="radio"
        :name="radioName"
        :value="value"
        :checked="currentValue"
        :disabled="radioDisabled"
        :class="radioDisabled ? 'is-disabled' : ''"
        @change="change"
      >
      <input
        v-else
        type="radio"
        :checked="currentValue"
        :disabled="disabled"
        :class="disabled ? 'is-disabled' : ''"
        @change="change"
      >
    </span>
    <slot></slot>
  </label>
</template>

<script lang="ts" setup name="IRadio">
import { computed, inject, onMounted, reactive, ref, watch } from 'vue'
import { useFindComponentUpward } from '../../hooks'

const formItemContext: any = inject('i-form-item-context', undefined)
const radioGroupContext: any = inject('i-radio-group-context', undefined)
const emit = defineEmits(['update:modelValue', 'on-change'])

const props = defineProps({
  modelValue: {
    type: [Number, String, Boolean],
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  value: {
    type: [Number, String, Boolean],
    default: false
  }
})

watch(() => props.modelValue, (val) => {
  currentValue.value = val
})

const currentValue = ref<any>(props.modelValue)

const change = (event) => {
  if (props.disabled) {
    return false
  }

  const checked = event.target.checked
  currentValue.value = checked

  emit('update:modelValue', checked)

  if (insideGroup.value) {
    radioGroupContext.change(event.target.value)
  } else {
    emit('on-change', checked)
    formItemContext?.validate('change')
  }
}

const radioName = ref('')
const setRadioName = id => radioName.value = id
const updateChecked = val => {
  currentValue.value = val === props.value
}

const groupDisabled = ref(false)
const updateDisabled = val => {
  groupDisabled.value = val
}

const radioDisabled = computed(() => {
  return props.disabled || groupDisabled.value
})

const context = reactive({
  setRadioName,
  updateChecked,
  updateDisabled
})

const insideGroup = ref(false)
const radioParent = useFindComponentUpward('IRadioGroup')
onMounted(() => {
  if (radioParent) {
    insideGroup.value = true
  }

  if (insideGroup.value) {
    radioGroupContext?.addField(context)
  }
})


</script>

<style scoped>
.is-disabled {
  cursor: not-allowed;
}

</style>