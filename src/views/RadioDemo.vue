<template>
  <div style="marginTop: 50px">
    <i-radio
      v-model="radio"
    >
    选项1
    </i-radio>
    {{ radio }}

    <i-radio-group v-model="radioVal" @on-change="handleChange">
      <i-radio value="1">选项 1</i-radio>
      <i-radio value="2">选项 2</i-radio>
      <i-radio value="3">选项 3</i-radio>
      <i-radio value="4">选项 4</i-radio>
    </i-radio-group>
    {{ radioVal }}
  </div>
</template>

<script lang="ts" setup name="RadioDemo">
import { ref } from 'vue'
import IRadio from '../components/radio/radio.vue'
import IRadioGroup from '../components/radio/radio-group.vue'


const radio = ref(false)


const radioVal = ref('4')
const handleChange = (val) => {
  console.log(val)
}

</script>

<style lang="scss" scoped>

</style>