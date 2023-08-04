<template>
  <el-icon class="font16" :color="DEFAULT_PRIMARY">
    <component :is="themeStore.isCollapse ? ArrowRight : ArrowLeft"></component>
  </el-icon>
</template>

<script setup lang="ts">
import { ArrowRight, ArrowLeft } from "@element-plus/icons-vue";
import { useThemeStore } from "@/stores/theme";
import { DEFAULT_PRIMARY } from "@/config/index";

const themeStore = useThemeStore();
</script>

<style scoped lang="scss"></style>
