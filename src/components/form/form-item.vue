<template>
  <div>
    <label v-if="label" :class="{ 'i-form-item-label-required': isRequired }">{{ label }}</label>
    <div>
      <slot></slot>
      <div v-if="validateState === 'error'" class="i-form-item-message">{{ validateMessage }}</div>
    </div>
  </div>
</template>

<script setup name="iFormItem">
import { ref, computed, inject, onMounted, provide, reactive } from 'vue'
import AsyncValidator from 'async-validator';

let initailValue = undefined
const formContext = inject('i-form-context', undefined)

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  prop: {
    type: String
  }
})

const fieldValue = computed(() => {
  const model = formContext?.model
  if (!model || !props.prop) {
    return
  }
  return model[props.prop]
})

const getRules = () => {
  let formRules = formContext.rules
  formRules = formRules ? formRules[props.prop] : []
  return [].concat(formRules || [])
}
const getFilteredRule = (trigger) => {
  const rules = getRules()
  return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
}

const isRequired = ref(false)
const validateState = ref('')
const validateMessage = ref('')

const validate = (trigger, callback) => {
  const rules = getFilteredRule(trigger)

  if (!rules || rules.length === 0) {
    return true
  }

  validateState.value = 'validating'

  let descriptor = {}
  descriptor[props.prop] = rules

  const validator = new AsyncValidator(descriptor)

  let model = {}
  model[props.prop] = fieldValue.value

  validator.validate(model, { firstFields: true }, errors => {
    validateState.value = !errors ? 'success' : 'error'
    validateMessage.value = errors ? errors[0].message : ''

    if (callback) {
      callback(validateMessage.value)
    }
  })
}

const resetField = () => {
  validateState.value = ''
  validateMessage.value = ''

  formContext.model[props.prop] = initailValue
}

const initRules = () => {
  const rules = getRules();
  if (rules.length) {
    isRequired.value = rules.some((rule) => rule.required)
  }
}

const context = reactive({
  validate,
  resetField
})

provide('i-form-item-context', context)
onMounted(() => {
  if (props.prop) {
    formContext?.addField(context)
    initailValue = fieldValue.value
    initRules()
  }
})
</script>

<style>
.i-form-item-label-required:before {
  content: '*';
  color: red;
}
.i-form-item-message {
  color: red;
}
</style>