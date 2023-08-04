<template>
  <el-container class="layout">
    <el-aside class="layout-aside" :style="{ width: isCollapse ? '65px' : '210px' }">
      <div class="layout-logo flex-center">
        <img src="@/assets/images/login/logoName@2x.png" alt="logo" />
      </div>
      <el-scrollbar>
        <el-menu
          :default-active="activeMenu"
          :router="false"
          :collapse="isCollapse"
          :collapse-transition="false"
          :unique-opened="true"
          background-color="#191a20"
          text-color="#bdbdc0"
          active-text-color="#ffffff"
        >
          <SubMenu :menuList="menuList" />
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header>
        <ToolBarLeft />
        <ToolBarRight />
      </el-header>
      <Main />
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useThemeStore } from "@/stores/theme";
import { useAuthStore } from "@/stores/auth";
import Main from "@/layouts/components/Main/Main.vue";
import ToolBarLeft from "@/layouts/components/Header/ToolBarLeft.vue";
import ToolBarRight from "@/layouts/components/Header/ToolBarRight.vue";
import SubMenu from "@/layouts/components/Menu/SubMenu.vue";
import { useDebounceFn } from "@/hooks/useDebounceFn";
import { useEventListener } from "@/hooks/useEventListener";

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
</script>

<style scoped lang="scss">
.layout {
  width: 100%;
  height: 100%;

  .layout-aside {
    display: flex;
    overflow: inherit;
    flex-direction: column;
    height: 100%;
    background-color: #191a20;
    transition: all 0.3s;

    .el-scrollbar {
      height: calc(100% - 55px);

      .el-menu {
        overflow-x: hidden;
      }
    }

    .layout-logo {
      border-bottom: 1px solid #282a35;
      height: 55px;

      span {
        height: 28px;
        font-weight: 700;
        font-size: 20px;
        color: #dadada;
        white-space: nowrap;
      }

      img {
        margin-right: 6px;
        width: 28px;
        height: 28px;
      }
    }
  }

  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    border-bottom: 1px solid #f1f1f1;
    height: 55px;
    background-color: #ffffff;
  }
}
</style>
