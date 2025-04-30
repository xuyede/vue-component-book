<template>
  <div>
    <i-form ref="formRef" :model="formData" :rules="validateRules">
      <i-form-item label="用户名" prop="name">
        <i-input v-model="formData.name"></i-input>
      </i-form-item>
      <i-form-item label="邮箱" prop="email">
        <i-input v-model="formData.email"></i-input>
      </i-form-item>
      <i-form-item label="同意" prop="agree">
        <i-checkbox v-model="formData.agree" />
      </i-form-item>
    </i-form>

    <button @click="handleReset">重置</button>
    <button @click="handleSubmit">提交</button>
  </div>
</template>

<script lang="js" setup name="Form">
import { ref } from 'vue'
import IForm from '../components/form/form.vue'
import IFormItem from '../components/form/form-item.vue'
import IInput from '../components/input/input.vue'
import ICheckbox from '../components/checkbox/checkbox.vue'

const formData = ref({
  name: '',
  email: '123',
  agree: false
})

const validateRules = ref({
  name: [
    { required: true, message: '用户名不能为空', trigger: 'change' }
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ],
  agree: [
    { message: '不能不勾选', trigger: 'change', validator: (rule, val) => val === true }
  ]
})

const formRef = ref(null)
const handleReset = () => {
  formRef.value?.resetFields()
}

const handleSubmit = () => {
  formRef.value?.validate().then(valid => {
    if (valid) {
      console.log('submit')
    } else {
      console.log('error')
    }
  })
}

</script>

<style lang="scss" scoped>
</style>