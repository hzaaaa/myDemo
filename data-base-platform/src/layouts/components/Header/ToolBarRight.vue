<template>
  <el-dropdown trigger="click">
    <div class="flex-center pointer">
      <Avatar />
      <span class="ml4 mr12 font16">{{ userStore?.userInfo?.sysUser?.username }}</span>
      <el-icon><arrow-down /></el-icon>
    </div>
    
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="router.push('/baseinfo')">
          <el-icon><User /></el-icon>
          基础信息
        </el-dropdown-item>
        <el-dropdown-item @click="refreshClick">
          <el-icon><Refresh /></el-icon>
          同步库表
        </el-dropdown-item>
        
        <el-dropdown-item @click="logout">
          <el-icon><SwitchButton /></el-icon>
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <Teleport to="body" v-if="refreshLoading"  >
    <div style="height: 100vh;width: 100vw;position: absolute;top: 0;left: 0;" v-loading="refreshLoading"></div>
  </Teleport>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { logoutApi } from "@/api/login";
import { useRoute, useRouter } from "vue-router";
import { User, SwitchButton, ArrowDown,Refresh } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import Avatar from "./components/Avatar.vue";
import {getDatabaseApi} from "@/api/biz/sql"

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const refreshLoading =ref(false)
// 退出登录
const logout = () => {
  ElMessageBox.confirm("确认退出吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  })
    .then(async () => {
      // 1. 调用退出登录接口
      await logoutApi();
      // 2. 清除 token 等缓存
      userStore.setToken("");
      localStorage.clear();
      // document.cookie = "";
      // 3. 重定向到登录页,并携带当前页面地址和参数
      const path = `/login?redirect=${route.path}&params=${JSON.stringify(route.query ? route.query : route.params)}`;
      router.replace(path);
      ElMessage.success("退出登录成功！");
    })
    .catch(() => {});
};
const refreshClick = ()=>{
  refreshLoading.value=true;
  getDatabaseApi({}).then((res:any)=>{
    console.log('getDatabaseApi',res);
    // if(res.code===200){
      router.go(0);
      ElMessage.success('同步库表成功');
    // }
  }).finally(()=>{
    refreshLoading.value=false
  })
}
</script>

<style scoped lang="scss">
.el-dropdown {
  color: #fff;
}
</style>
