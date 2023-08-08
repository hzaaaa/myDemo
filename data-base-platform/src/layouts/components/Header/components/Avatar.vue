<template>
  <div class="avatar">{{ acronymName }}</div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { computed } from "vue";

const userStore = useUserStore();
// const acronymName = computed(() => userStore.username);
// userStore.userInfo;
// debugger
const acronymName = computed(() => userStore?.userInfo?.sysUser?.username?.slice(0, 1).toUpperCase());
</script>

<style scoped lang="scss">
.avatar {
  overflow: hidden;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background-color: var(--el-color-primary);
}
</style>
