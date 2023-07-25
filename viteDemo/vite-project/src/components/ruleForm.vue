<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="Password" prop="pass">
      <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Confirm" prop="checkPass">
      <el-input
        v-model="ruleForm.checkPass"
        type="password"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item v-if="showAge" label="Age" prop="age" >
      <el-input v-model.number="ruleForm.age" />
    </el-form-item>
    {{ ruleForm.age }}
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >Submit</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      <el-button @click="hideClick">hide</el-button>
      <el-button @click="changeRuleClick">changeRule</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>

import type { FormInstance } from 'element-plus'


const ruleFormRef = ref<FormInstance>();
const showAge =ref(true)
const hideClick =()=>{
  showAge.value =!showAge.value;
}
const changeRuleClick =()=>{
  // showAge.value =!showAge.value;
  let n =rules?.checkPass?.length;
  rules.checkPass=n===0?[{ validator: validatePass2, trigger: 'blur' ,required:true}]:[]
}
const checkAge = (_rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the age'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Please input digits'))
    } else {
      if (value < 18) {
        callback(new Error('Age must be greater than 18'))
      } else {
        callback()
      }
    }
  }, 1000)
}

const validatePass = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  pass: '',
  checkPass: '',
  age: '',
})

const rules = reactive<any>({
  pass: [{ validator: validatePass, trigger: 'blur',required:true }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' ,required:true}],
  age: [{ validator: checkAge, trigger: 'blur' ,required:true}],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
