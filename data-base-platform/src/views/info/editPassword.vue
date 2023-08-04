<template>
  <div class="system-dept-dialog-container">
    <el-dialog title="修改密码" v-model="state.dialog.isShowDialog" width="440px" @closed="resetPasswordFields">
      <el-form ref="deptDialogFormRef" :model="state.ruleForm" :rules="rules" label-width="80px">
        <el-form-item label="旧密码" class="mb20" prop="lastPassword">
          <el-input v-model="state.ruleForm.lastPassword" placeholder="请填写旧密码" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" class="mb20" prop="newPassword">
          <el-input
            v-model="state.ruleForm.newPassword"
            placeholder="长度须大于6位数，包含数字、字母"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" class="mb20" prop="surePassword">
          <el-input v-model="state.ruleForm.surePassword" placeholder="请确认密码" type="password" show-password></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="systemDeptDialog">
import { FormInstance, FormRules } from "element-plus";
import { reactive, ref } from "vue";
import { PASSWORD_PATTERN } from "@/utils/toolsValidate";

// 定义子组件向父组件传值/事件
const emit = defineEmits(["submit"]);

// 定义变量内容
const deptDialogFormRef = ref<FormInstance>();
const state = reactive({
  ruleForm: {
    lastPassword: "",
    newPassword: "",
    surePassword: "",
  },
  dialog: {
    isShowDialog: false,
  },
});

// 密码表单校验规则
const validateSurePassword = (rule: any, value: string, callback: any) => {
  if (value.trim() === "") callback(new Error("请确认密码"));
  else if (value.trim() !== state.ruleForm.newPassword) callback(new Error("两次密码输入不一致"));
  else callback();
};
const rules = reactive<FormRules>({
  lastPassword: [{ required: true, message: "请填写旧密码", trigger: "blur" }],
  newPassword: [
    { required: true, message: "请输入用户密码", trigger: "blur" },
    { pattern: PASSWORD_PATTERN, message: "密码长度须大于6位数，包含数字、字母", trigger: "blur" },
  ],
  surePassword: [
    { required: true, message: "请确认密码", trigger: "blur" },
    { validator: validateSurePassword, trigger: "blur" },
  ],
});

// 打开弹窗
const openDialog = () => {
  state.dialog.isShowDialog = true;
};
// 关闭弹窗
const closeDialog = () => {
  state.dialog.isShowDialog = false;
};
// 取消
const onCancel = () => {
  closeDialog();
};
// 清空密码表单数据
const resetPasswordFields = () => {
  deptDialogFormRef.value!.resetFields();
};
// 提交
const onSubmit = () => {
  if (!deptDialogFormRef.value) return;
  deptDialogFormRef.value.validate((valid) => {
    if (valid) {
      emit("submit", {
        oldPwd: state.ruleForm.lastPassword,
        newPwd: state.ruleForm.newPassword,
      });
    } else {
      console.log("error submit");
      return false;
    }
  });
};

// 暴露变量
defineExpose({
  openDialog,
  closeDialog,
});
</script>

<style scoped lang="scss">
:deep(.el-dialog) {
  border-radius: 10px;
  .el-dialog__header {
    padding: 30px 28px;
  }
  .el-dialog__headerbtn {
    top: 16px;
  }
  // .el-dialog__title {
  //   font-size: 24px;
  // }
  .el-dialog__body {
    padding: 0px 28px;
  }
}
</style>
