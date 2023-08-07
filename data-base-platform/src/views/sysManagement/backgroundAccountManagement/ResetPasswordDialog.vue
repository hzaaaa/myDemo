<template>
  <el-dialog v-model="dialogVisible" title="重置密码" class="pwd-reset-dialog" width="520px" style="height: 240px">
    <span>新密码</span><span>{{ dialogProps?.pwd }}</span
    ><span
      name="icon-fuzhi"
      style="margin-left: 10px; cursor: pointer; color: var(--el-color-primary)"
      @click="copyTextToClipboard(dialogProps!.pwd)"
      >复制</span
    >
    <template #footer>
      <!-- <el-button @click="dialogVisible = false">取消</el-button> -->
      <el-button type="primary" @click="dialogVisible = false">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";

const dialogVisible = ref(false);
interface DialogProps {
  id?: number;
  pwd: string;
  // api?: (params: any) => Promise<any>;
}

const dialogProps = ref<DialogProps>();

const acceptParams = (params: DialogProps) => {
  dialogProps.value = params;
  dialogVisible.value = true;
};

// 发送邮件
const sendEmail = async () => {
  try {
    // await
    ElMessage.success("发送邮件成功!");
    dialogVisible.value = false;
  } catch (err) {
    console.log(err);
  }
};
// **工具方法** 复制内容到剪贴板
const copyTextToClipboard = (copyContent: string) => {
  if (navigator.clipboard) {
    // 新api，安全限制较多，https 或 localhost 才可用
    navigator.clipboard.writeText(copyContent);
  } else {
    // 传统api，随时可能会废弃
    const tempInput = document.createElement("input");
    tempInput.setAttribute("value", copyContent);
    document.body.append(tempInput);
    tempInput.select();
    document.execCommand("copy");
    tempInput.remove();
  }
  ElMessage.success("复制成功");
};
defineExpose({
  acceptParams,
});
</script>

<style lang="scss">
.el-dialog.pwd-reset-dialog {
  border-radius: 10px;
  box-shadow: 0 8px 20px 1px rgb(177 197 197 / 8%);
  .el-dialog__header {
    margin-right: 0;
    padding: 30px 28px 0;
    .el-dialog__title {
      font-family: PingFangSC-Regular-, PingFangSC-Regular;
      font-weight: normal;
      font-size: 24px;
      color: #303133;
    }
    .el-dialog__headerbtn {
      top: 16px;
    }
  }
  .el-dialog__body {
    padding-left: 81px;
    padding-top: 36px;
    span {
      display: inline-block;
      font-family: PingFangSC-Regular-, PingFangSC-Regular;
      font-weight: normal;
      font-size: 14px;
      color: #606266;
      &:nth-of-type(2) {
        margin-left: 26px;
        color: #303133;
      }
    }
  }
  .el-dialog__footer {
    position: absolute;
    right: 27px;
    bottom: 29px;
    padding: 0;
    .el-button {
      width: 70px;
      height: 32px;
    }
  }
}
</style>
