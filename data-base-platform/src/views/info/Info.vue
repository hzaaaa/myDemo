<template>
  <div class="personal">
    <el-card shadow="hover" class="personal-edit">
      <div class="up">
        <div class="title">个人信息</div>
        <div class="row">
          <div class="label">用户名</div>
          <div class="content">{{ userStore?.userInfo?.sysUser?.username ? userStore?.userInfo?.sysUser?.username:'--' }}</div>
        </div>
        <div class="row">
          <div class="label">姓名</div>
          <div class="content">{{ userStore?.userInfo?.sysUser?.nickName ? userStore?.userInfo?.sysUser?.nickName:'--' }}</div>
        </div>
        <div class="row">
          <div class="label">手机号</div>
          <div class="content">{{ userStore?.userInfo?.sysUser?.phone ? userStore?.userInfo?.sysUser?.phone :'--' }}</div>
        </div>
        <div class="row">
          <div class="label">邮箱</div>
          <div class="content">{{ userStore?.userInfo?.sysUser?.email ? userStore?.userInfo?.sysUser?.email :'--'}}</div>
        </div>
        <div class="row">
          <div class="label">登录密码</div>
          <div class="content">
            <el-button type="primary" @click="onEditPassword" link>修改</el-button>
          </div>
        </div>
        <div class="row">
          <div class="label">创建时间</div>
          <div class="content">{{ userStore?.userInfo?.sysUser?.createTime }}</div>
        </div>
      </div>
      <!-- <div class="separator"></div>
      <div class="down">
        <div class="title">公司信息</div>
        <div class="row">
          <div class="label">公司名称</div>
          <div class="content">{{ userStore.companyInfo.companyName }}</div>
        </div>
      </div> -->
    </el-card>

    <PasswordDialog ref="passDialogRef" @submit="updatePassword" />
  </div>
</template>

<script setup lang="ts" name="personal">
import { useUserStore } from "@/stores/user";
import { defineAsyncComponent, ref } from "vue";

import { pwdChangeApi } from "@/api/system/user";
import { ElMessage } from "element-plus";

// 引入组件
const PasswordDialog = defineAsyncComponent(() => import("./editPassword.vue"));

// 定义变量内容
const userStore = useUserStore();
const passDialogRef = ref();

// 定义变量内容

// 密码修改
const onEditPassword = () => {
  passDialogRef.value.openDialog();
};
const updatePassword = (params: any) => {
  pwdChangeApi(params).then((res) => {
    if (res.code === 200) {
      ElMessage.success("修改成功");
      passDialogRef.value.closeDialog();
    }
  });
};
</script>

<style scoped lang="scss">
:deep(.el-card__body) {
  padding: 0;
}
.el-card {
  height: 100%;
  border-radius: 10px;
}
.personal {
  height: 100%;
  font-size: 14px;
  .personal-edit {
    .up {
      padding: 40px 68px 48px;
    }
    .down {
      padding: 48px 68px 40px;
    }
    .title {
      font-size: 18px;
      color: #303133;
      height: 24px;
      font-weight: 600;
    }
    .row {
      display: flex;
      height: 20px;
      margin-top: 30px;
    }
    .label {
      color: #a8abb2;
      width: 72px;
      text-align: end;
      margin-right: 40px;
    }

    .content {
      color: #606266;
    }

    .separator {
      width: 100%;
      border-bottom: 1px solid #e5e5e5;
      transform: scaleY(0.5);
    }

    .personal-edit-title {
      font-weight: 600;
      position: relative;
      color: var(--el-text-color-regular);
      margin-bottom: 20px;
    }

    .personal-edit-last-title {
      margin-top: 50px;
    }
  }
}
</style>
