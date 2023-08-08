<!-- 经典布局 -->
<template>
  <el-container class="layout">
    <el-header class="layout-header">
      <div class="header-lf">
        <div class="layout-logo flex-center">
          <img src="@/assets/images/login/logoName@2x.png" alt="logo" />
        </div>
      </div>
      <div class="header-ri">
        <ToolBarRight />
      </div>
    </el-header>
    <el-container class="layout-body">
      <el-aside class="layout-aside" :style="{ width: isCollapse ? '64px' : '208px' }">
        <el-scrollbar>
          <el-menu
            :default-active="activeMenu"
            :router="false"
            :collapse="isCollapse"
            :collapse-transition="false"
            :unique-opened="true"
          >
            <SubMenu :menuList="menuList" />
          </el-menu>
        </el-scrollbar>
        <div class="collapse-icon pointer" :class="{ collapsed: isCollapse }" @click="collapse">
          <CollapseIcon />
        </div>
      </el-aside>
      <el-container class="layout-main">
        <ToolBarLeft />
        <Main />
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useThemeStore } from "@/stores/theme";
import { useAuthStore } from "@/stores/auth";
import Main from "@/layouts/components/Main/Main.vue";
import ToolBarLeft from "@/layouts/components/Header/ToolBarLeft.vue";
import ToolBarRight from "@/layouts/components/Header/ToolBarRight.vue";
import SubMenu from "@/layouts/components/Menu/SubMenu.vue";
import { useDebounceFn } from "@/hooks/useDebounceFn";
import { useEventListener } from "@/hooks/useEventListener";
import { computed, ref } from "vue";
import CollapseIcon from "@/layouts/components/CollapseIcon/CollapseIcon.vue";

const route = useRoute();
const themeStore = useThemeStore();
const authStore = useAuthStore();
const isCollapse = computed(() => themeStore.isCollapse);
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path));
const menuList = computed(() => authStore.showMenuListGet);
// 监听窗口大小变化，折叠侧边栏
const screenWidth = ref(0);
const listeningWindow = useDebounceFn(() => {
  screenWidth.value = document.body.clientWidth;
  if (!isCollapse.value && screenWidth.value < 1200) themeStore.setThemeState("isCollapse", true);
  if (isCollapse.value && screenWidth.value > 1200) themeStore.setThemeState("isCollapse", false);
});
useEventListener(window, "resize", listeningWindow);

const collapse = () => {
  themeStore.setThemeState("isCollapse", !themeStore.isCollapse);
};
</script>

<style scoped lang="scss">
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .layout-header {
    flex: 0 0 auto;
  }
  .layout-body {
    // flex-shrink: 1;
    height: 0;
    flex:1;
  }
  .layout-aside {
    display: flex;
    overflow: inherit;
    flex-direction: column;
    height: 100%;
    color: #303133;
    transition: all 0.3s;
    // padding-top: 20px;
    position: relative;
    .collapse-icon {
      width: 32px;
      height: 32px;
      border: 1px solid #ddd;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: 72px;
      right: 20px;
      background-color: #fff;
      transition: all ease 0.3s;
      &.collapsed {
        right: -16px;
      }
    }
  }

  .layout-logo {
    img {
      width: 200px;
      height: 30px;
    }
  }

  .layout-main {
    flex-direction: column;
    padding: 20px 24px;
    background-color: #f6f6f6;
    .breadcrumb {
      margin-bottom: 12px;
    }
  }
}
.el-header {
  background-color: #112625;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  color: #fff;
}
</style>
