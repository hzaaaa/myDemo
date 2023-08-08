<template>
  <el-config-provider :locale="locale">
    <RouterView ></RouterView>
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed } from "vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";

const locale = computed(() => {
  return zhCn;
});
</script>

<style scoped></style>
