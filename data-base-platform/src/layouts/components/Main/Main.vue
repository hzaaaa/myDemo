<template>
  <Tabs v-if="themeStore.tabs" />
  <el-main>
    <router-view :key="route.fullPath" v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="keepAliveStore.keepAliveName">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
</template>

<script setup lang="ts">
import Tabs from "@/layouts/components/Tabs/Tabs.vue";
import { useThemeStore } from "@/stores/theme";
import { useKeepAliveStore } from "@/stores/keepAlive";
const route = useRoute();
const themeStore = useThemeStore();
const keepAliveStore = useKeepAliveStore();
</script>

<style scoped lang="scss">
.el-main {
  overflow-x: hidden;
  box-sizing: border-box;
  // background-color: #f0f2f5;
  padding: 0;
  border-radius: 10px;
  // :deep(.el-card) {
  //   border: none;
  // }

  &::-webkit-scrollbar {
    background-color: #f0f2f5;
  }
}
</style>
