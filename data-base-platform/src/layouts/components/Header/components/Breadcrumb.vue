<template>
  <el-breadcrumb v-if="breadcrumbList.length">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path" @click="onBreadcrumbClick(item, index)">
        <div class="el-breadcrumb__inner is-link flex">
          <!-- <el-icon v-show="item.meta.icon && themeStore.breadcrumbIcon" class="breadcrumb-icon">
            <component :is="item.meta.icon"></component>
          </el-icon> -->
          <span class="breadcrumb-title">{{ item?.meta?.title }}</span>
        </div>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
  <div class="back pointer" v-else @click="router.back()">
    <el-icon class="mr4"><ArrowLeft /></el-icon>
    <span>返回</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useThemeStore } from "@/stores/theme";
import { useRoute, useRouter } from "vue-router";
import { ArrowLeft } from "@element-plus/icons-vue";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const themeStore = useThemeStore();
const breadcrumbList = computed(() => authStore.breadcrumbListGet[route.matched[route.matched.length - 1].path] ?? []);

const onBreadcrumbClick = (item: any, index: number) => {
  console.log("bread", breadcrumbList.value);

  if (index !== breadcrumbList.value.length - 1) router.push(item.path);
};
</script>

<style scoped lang="scss">
@media screen and (max-width: 1000px) {
  .el-breadcrumb {
    display: none;
  }
}

.el-breadcrumb__item {
  .breadcrumb-icon {
    margin-right: 6px;
    width: 20px;
    font-size: 16px;
  }

  .breadcrumb-title {
    font-weight: 400;
    color: #606266;
    &:hover {
      color: var(--el-color-primary);
    }
  }
  &:last-child {
    :deep(.breadcrumb-title) {
      color: var(--el-color-primary);
    }
  }
}
.back {
  line-height: 14px;
  font-weight: 300;
  color: #606266;
  font-size: 14px;
  display: flex;
  align-items: center;
  span:hover {
    color: var(--el-color-primary);
  }
}
</style>
