<template>
  <div style="marginTop: 50px">
    <i-checkbox
      v-model="bool"
      @on-change="handleChange"
    >
    同意
    </i-checkbox>
    {{ bool }}

    <i-checkbox-group v-model="multiple">
      <i-checkbox label="option1">选项 1</i-checkbox>
      <i-checkbox label="option2">选项 2</i-checkbox>
      <i-checkbox label="option3">选项 3</i-checkbox>
      <i-checkbox label="option4">选项 4</i-checkbox>
    </i-checkbox-group>
    {{ multiple }}
  </div>
</template>

<script lang="ts" setup name="CheckboxDemo">
import { ref } from 'vue'
import ICheckbox from '../components/checkbox/checkbox.vue'
import ICheckboxGroup from '../components/checkbox/checkbox-group.vue'


const bool = ref(false)
const handleChange = (val) => {
  bool.value = val
}

const multiple = ref([
  'option1'
])


</script>

<style lang="scss" scoped>

</style>